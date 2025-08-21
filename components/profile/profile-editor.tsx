"use client";

import { useState, useActionState, useEffect, useRef } from "react";
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
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { updateProfileAction } from "@/actions/profile/update-profile-actions";
import { useRouter } from "next/navigation";
import { useAvatarUpload } from "@/hooks/useAvatarUpload";
import { getInitials, createImagePreview } from "@/lib/avatar-utils";

interface ProfileEditorProps {
  user: AuthUser;
}

export function ProfileEditor({ user }: ProfileEditorProps) {
  const router = useRouter();
  // 🚀 SUPABASE INTEGRATION: Hook para manejar upload de avatares
  const {
    uploadAvatar,
    deleteFromStorage,
    uploading,
    error: uploadError,
  } = useAvatarUpload();

  // Ref para el input de archivo (necesario para limpiar después del upload)
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados locales para el formulario
  const [previewAvatar, setPreviewAvatar] = useState<string>(
    user.avatarUrl || ""
  );
  const [avatarUrl, setAvatarUrl] = useState<string>(user.avatarUrl || ""); // 📍 AQUÍ ESTÁ LA URL DEL AVATAR PARA TU SERVER ACTION
  const [pendingFile, setPendingFile] = useState<File | null>(null); // Archivo pendiente de subir
  const [hasPendingChanges, setHasPendingChanges] = useState<boolean>(false); // Indica si hay cambios sin guardar
  const [formData, setFormData] = useState<EditProfileForm>({
    fullName: user.fullName || "",
    email: user.email || "",
    phone: user.phone,
    avatarUrl: user.avatarUrl || "",
  });

  const [state, formAction, isPending] = useActionState(updateProfileAction, {
    success: "",
    errors: [],
  });

  console.log("avatarUrl", avatarUrl);

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => toast.error(error));
    }

    if (state.success) {
      toast.success(state.success);
    }
  }, [state, router]);

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Si había un archivo pendiente anterior, limpiarlo
      if (pendingFile) {
        setPendingFile(null);
      }

      // 1️⃣ Crear preview local inmediatamente
      const preview = await createImagePreview(file);
      setPreviewAvatar(preview);
      setPendingFile(file); // Guardamos el archivo para subirlo después

      // 2️⃣ Marcar que hay cambios pendientes
      setHasPendingChanges(true);

      // 3️⃣ Limpiar el input para permitir reusar
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // 4️⃣ Mostrar indicador de que hay cambios sin guardar
      toast.info("Imagen seleccionada. Guarda los cambios para subirla.", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Error al crear preview:", error);
      toast.error("Error al procesar la imagen");

      // Revertir estados en caso de error
      setPreviewAvatar(user.avatarUrl || "");
      setPendingFile(null);
    }
  };

  // 🗑️ NUEVA FUNCIÓN: Eliminar avatar actual
  const handleRemoveAvatar = () => {
    // Limpiar todos los estados relacionados con el avatar
    setPreviewAvatar("");
    setAvatarUrl(""); // 📍 AQUÍ SE LIMPIA LA URL PARA TU SERVER ACTION
    setPendingFile(null);
    setHasPendingChanges(true); // Marcar que hay cambios pendientes

    // Limpiar el input de archivo
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setFormData((prev) => ({ ...prev, avatarUrl: "" }));

    toast.success(
      "Avatar marcado para eliminar. Guarda los cambios para confirmar."
    );
  };

  // 📋 NUEVA FUNCIÓN: Manejar envío del formulario con upload de avatar
  const handleFormSubmit = async (formData: FormData) => {
    let uploadedAvatarUrl = avatarUrl; // Valor actual por defecto

    try {
      // 1️⃣ Si hay archivo pendiente, subirlo primero
      if (pendingFile) {
        toast.loading("Subiendo imagen...", { id: "avatar-upload" });

        try {
          uploadedAvatarUrl = await uploadAvatar(pendingFile, user.id);
          toast.success("Imagen subida correctamente", { id: "avatar-upload" });

          // Limpiar archivo pendiente
          setPendingFile(null);
          setHasPendingChanges(false);
        } catch (uploadError) {
          toast.error("Error al subir la imagen", { id: "avatar-upload" });
          throw uploadError; // Abortar todo el submit si la imagen falla
        }
      }

      // 2️⃣ Actualizar formData con la URL final
      formData.set("avatarUrl", uploadedAvatarUrl);

      // 3️⃣ Enviar el formulario con la acción server
      const result = await updateProfileAction(null, formData);

      // 4️⃣ Si todo sale bien, actualizar estados locales
      if (result.success) {
        setAvatarUrl(uploadedAvatarUrl);
        setPreviewAvatar(uploadedAvatarUrl);
        setHasPendingChanges(false);
        toast.success("Perfil actualizado correctamente");
      }
    } catch (error) {
      console.error("Error en handleSubmit:", error);

      // Si falló después de subir la imagen, podrías eliminarla
      if (uploadedAvatarUrl !== avatarUrl && pendingFile) {
        try {
          await deleteFromStorage(uploadedAvatarUrl);
        } catch (deleteError) {
          console.error("Error al limpiar imagen subida:", deleteError);
        }
      }

      toast.error("Error al actualizar el perfil");
    }
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
    setAvatarUrl(user.avatarUrl || "");
    setPendingFile(null);
    setHasPendingChanges(false);
    
    // Limpiar el input de archivo
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form className="space-y-6" action={handleFormSubmit}>
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
                  ref={fileInputRef}
                  id="avatar-upload"
                  name="avatar"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <Input type="hidden" name="avatarUrl" value={avatarUrl} />

                {previewAvatar && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={handleRemoveAvatar}
                    disabled={uploading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {uploading ? "Eliminando..." : "Eliminar"}
                  </Button>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                Formatos soportados: JPG, PNG, WEBP. Tamaño máximo: 5MB.
              </p>

              {/* Estado del upload */}
              {pendingFile && (
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <Upload className="h-4 w-4" />
                  Archivo listo para subir: {pendingFile.name}
                </div>
              )}

              {hasPendingChanges && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Upload className="h-4 w-4" />
                  Tienes cambios sin guardar en tu avatar
                </div>
              )}

              {uploading && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Subiendo imagen a Supabase...
                </div>
              )}

              {uploadError && (
                <div className="text-sm text-red-600">Error: {uploadError}</div>
              )}
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
            {/* 📍 ESTA ES LA URL QUE RECIBES EN TU SERVER ACTION */}
            <input type="hidden" name="avatarUrl" value={avatarUrl} />
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
