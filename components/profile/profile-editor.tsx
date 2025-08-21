"use client";

import { useState, useActionState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User as AuthUser } from "@/lib/validations/auth";
import { EditProfileForm } from "@/lib/validations/auth";
import {
  Upload,
  Save,
  X,
  Camera,
  Loader2,
  User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";
import { updateProfileAction } from "@/actions/profile/update-profile-actions";
import { useRouter } from "next/navigation";

interface ProfileEditorProps {
  user: AuthUser;
}

export function ProfileEditor({ user }: ProfileEditorProps) {
  /* 
  ====================================
  🔗 API CALLS NEEDED FOR THIS COMPONENT:
  ====================================
  
  1. ✏️ UPDATE USER PROFILE:
     - Method: PATCH
     - Endpoint: /api/user/profile
     - Headers: { Authorization: "Bearer {token}", "Content-Type": "application/json" }
     - Body: {
         fullName: string,
         email: string,
         phone: string,
         avatarUrl?: string
       }
     - Response: {
         success: boolean,
         message: string,
         user: { id, fullName, email, phone, avatarUrl, ... }
       }
  
  2. 📸 UPLOAD PROFILE PICTURE:
     - Method: POST
     - Endpoint: /api/upload/avatar
     - Headers: { Authorization: "Bearer {token}" }
     - Body: FormData with 'file' field
     - Response: {
         success: boolean,
         avatarUrl: string,
         message: string
       }
  
  3. 🗑️ DELETE PROFILE PICTURE:
     - Method: DELETE
     - Endpoint: /api/user/avatar
     - Headers: { Authorization: "Bearer {token}" }
     - Response: {
         success: boolean,
         message: string
       }
  
  💡 IMPLEMENTATION NOTES:
  - Validate form data before sending to API
  - Show loading states during upload/update
  - Handle file size and format validation for avatar
  - Show success/error messages using toast
  - Reset form to original values on cancel
  - Support drag & drop for avatar upload
  */

  // Mock server action placeholder - TODO: Implement real server action

  const router = useRouter();
  const [state, formAction, isPending] = useActionState(updateProfileAction, {
    success: "",
    errors: [],
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => toast.error(error));
    }

    if (state.success) {
      toast.success(state.success);
    }
  }, [state, router]);

  const [previewAvatar, setPreviewAvatar] = useState<string>(
    user.avatarUrl || ""
  );
  const [formData, setFormData] = useState<EditProfileForm>({
    fullName: user.fullName || "",
    email: user.email || "",
    phone: user.phone, // TODO: Get real phone from user data
    avatarUrl: user.avatarUrl || "",
  });

  // Función para obtener las iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle file upload for avatar
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("El archivo debe ser menor a 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten archivos de imagen");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);

    // TODO: Upload file to server and get URL
    toast.success("Imagen cargada. Guarda los cambios para aplicar.");
  };

  // Handle form input changes
  const handleInputChange = (field: keyof EditProfileForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Reset form to original values
  const handleReset = () => {
    setFormData({
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone,
      avatarUrl: user.avatarUrl || "",
    });
    setPreviewAvatar(user.avatarUrl || "");
  };

  return (
    <form action={formAction} className="space-y-6">
      {/* Hidden field to track original email */}
      <input type="hidden" name="originalEmail" value={user.email} />
      
      {/* Profile Picture Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Foto de Perfil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar Preview */}
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={previewAvatar} alt={formData.fullName} />
                <AvatarFallback className="text-2xl">
                  {getInitials(formData.fullName)}
                </AvatarFallback>
              </Avatar>

              {/* Upload overlay */}
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Upload Controls */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap gap-3">
                <Label htmlFor="avatar-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Subir Foto
                    </span>
                  </Button>
                </Label>
                <Input
                  id="avatar-upload"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />

                {previewAvatar && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPreviewAvatar("");
                      setFormData((prev) => ({ ...prev, avatarUrl: "" }));
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Quitar
                  </Button>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                Formatos soportados: JPG, PNG, GIF. Tamaño máximo: 5MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            Información Personal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Tu nombre completo"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="9999999999"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>

            {/* Avatar URL (hidden, for form submission) */}
            <input type="hidden" name="avatarUrl" value={previewAvatar} />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={isPending}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending} className="min-w-32">
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
