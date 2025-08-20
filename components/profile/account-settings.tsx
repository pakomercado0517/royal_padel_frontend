"use client";

import { useState, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User } from "@/lib/validations/auth";
import { 
  changePasswordSchema, 
  notificationSettingsSchema, 
  privacySettingsSchema,
  ChangePasswordForm,
  NotificationSettingsForm,
  PrivacySettingsForm
} from "@/lib/validations/auth";
import { 
  Key,
  Bell,
  Shield,
  Save,
  Loader2,
  Eye,
  EyeOff,
  AlertTriangle,
  Mail,
  MessageSquare,
  UserCheck,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

interface AccountSettingsProps {
  user: User;
}

export function AccountSettings({ }: AccountSettingsProps) {
  /* 
  ====================================
  🔗 API CALLS NEEDED FOR THIS COMPONENT:
  ====================================
  
  1. 🔐 CHANGE PASSWORD:
     - Method: POST
     - Endpoint: /api/user/change-password
     - Headers: { Authorization: "Bearer {token}", "Content-Type": "application/json" }
     - Body: {
         currentPassword: string,
         newPassword: string,
         confirmPassword: string
       }
     - Response: {
         success: boolean,
         message: string
       }
  
  2. 🔔 UPDATE NOTIFICATION SETTINGS:
     - Method: PATCH
     - Endpoint: /api/user/notification-settings
     - Headers: { Authorization: "Bearer {token}", "Content-Type": "application/json" }
     - Body: {
         emailNotifications: boolean,
         smsNotifications: boolean,
         pushNotifications: boolean,
         marketingEmails: boolean,
         gameReminders: boolean
       }
     - Response: {
         success: boolean,
         message: string,
         settings: NotificationSettingsForm
       }
  
  3. 🛡️ UPDATE PRIVACY SETTINGS:
     - Method: PATCH
     - Endpoint: /api/user/privacy-settings
     - Headers: { Authorization: "Bearer {token}", "Content-Type": "application/json" }
     - Body: {
         profileVisibility: "public" | "friends" | "private",
         showEmail: boolean,
         showPhone: boolean,
         allowFriendRequests: boolean
       }
     - Response: {
         success: boolean,
         message: string,
         settings: PrivacySettingsForm
       }
  
  4. 🗑️ DELETE ACCOUNT:
     - Method: DELETE
     - Endpoint: /api/user/delete-account
     - Headers: { Authorization: "Bearer {token}", "Content-Type": "application/json" }
     - Body: {
         password: string,
         confirmDeletion: string // Should be "DELETE"
       }
     - Response: {
         success: boolean,
         message: string
       }
  
  💡 IMPLEMENTATION NOTES:
  - All forms should validate before sending to API
  - Show confirmation dialogs for sensitive actions
  - Use toast notifications for success/error feedback
  - Password change should require current password
  - Account deletion should be irreversible with strong confirmation
  - Settings should be loaded from user preferences on mount
  */

  // State for showing/hiding passwords
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Define interface for form states
  interface FormState {
    success: boolean;
    message: string;
    errors: Record<string, string>;
  }

  // Mock server actions - TODO: Implement real server actions
  const changePasswordAction = async (_: FormState, __: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: "Contraseña actualizada exitosamente", errors: {} };
  };

  const updateNotificationSettingsAction = async (_: FormState, __: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, message: "Configuración de notificaciones actualizada", errors: {} };
  };

  const updatePrivacySettingsAction = async (_: FormState, __: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, message: "Configuración de privacidad actualizada", errors: {} };
  };

  // Form states
  const [passwordState, passwordAction, isPasswordPending] = useActionState(changePasswordAction, {
    success: false, message: "", errors: {}
  });

  const [notificationState, notificationAction, isNotificationPending] = useActionState(updateNotificationSettingsAction, {
    success: false, message: "", errors: {}
  });

  const [privacyState, privacyAction, isPrivacyPending] = useActionState(updatePrivacySettingsAction, {
    success: false, message: "", errors: {}
  });

  // Form data states
  const [passwordForm, setPasswordForm] = useState<ChangePasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettingsForm>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    gameReminders: true,
  });

  const [privacySettings, setPrivacySettings] = useState<PrivacySettingsForm>({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    allowFriendRequests: true,
  });

  // Handle password form submission
  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const validation = changePasswordSchema.safeParse(passwordForm);
    if (!validation.success) {
      validation.error.errors.forEach(error => {
        toast.error(`${error.path.join(".")}: ${error.message}`);
      });
      return;
    }

    const formData = new FormData(event.currentTarget);
    passwordAction(formData);
    
    // Clear form on success
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // Handle notification settings update
  const handleNotificationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const validation = notificationSettingsSchema.safeParse(notificationSettings);
    if (!validation.success) {
      validation.error.errors.forEach(error => {
        toast.error(`${error.path.join(".")}: ${error.message}`);
      });
      return;
    }

    const formData = new FormData(event.currentTarget);
    notificationAction(formData);
  };

  // Handle privacy settings update
  const handlePrivacySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const validation = privacySettingsSchema.safeParse(privacySettings);
    if (!validation.success) {
      validation.error.errors.forEach(error => {
        toast.error(`${error.path.join(".")}: ${error.message}`);
      });
      return;
    }

    const formData = new FormData(event.currentTarget);
    privacyAction(formData);
  };

  return (
    <div className="space-y-6">
      {/* Change Password Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Cambiar Contraseña
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Contraseña Actual</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña actual"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordState.errors?.currentPassword && (
                <p className="text-sm text-red-500">{passwordState.errors.currentPassword}</p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nueva Contraseña</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Ingresa tu nueva contraseña"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordState.errors?.newPassword && (
                <p className="text-sm text-red-500">{passwordState.errors.newPassword}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirma tu nueva contraseña"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordState.errors?.confirmPassword && (
                <p className="text-sm text-red-500">{passwordState.errors.confirmPassword}</p>
              )}
            </div>

            <Button type="submit" disabled={isPasswordPending} className="w-full sm:w-auto">
              {isPasswordPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Actualizando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Cambiar Contraseña
                </>
              )}
            </Button>

            {/* Success/Error Messages */}
            {passwordState.success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md dark:bg-green-900/20 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-400">
                  {passwordState.message}
                </p>
              </div>
            )}
            
            {!passwordState.success && passwordState.message && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
                <p className="text-sm text-red-700 dark:text-red-400">
                  {passwordState.message}
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Configuración de Notificaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNotificationSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Notificaciones por Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe updates importantes en tu correo electrónico
                    </p>
                  </div>
                </div>
                <Switch
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))
                  }
                />
              </div>

              {/* SMS Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="smsNotifications">Notificaciones SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe recordatorios y alertas por mensaje de texto
                    </p>
                  </div>
                </div>
                <Switch
                  id="smsNotifications"
                  name="smsNotifications"
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={(checked) => 
                    setNotificationSettings(prev => ({ ...prev, smsNotifications: checked }))
                  }
                />
              </div>

              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">Notificaciones Push</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones instantáneas en tu dispositivo
                    </p>
                  </div>
                </div>
                <Switch
                  id="pushNotifications"
                  name="pushNotifications"
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={(checked) => 
                    setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))
                  }
                />
              </div>

              <Separator />

              {/* Marketing Emails */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="marketingEmails">Emails de Marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe ofertas, promociones y noticias del club
                    </p>
                  </div>
                </div>
                <Switch
                  id="marketingEmails"
                  name="marketingEmails"
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={(checked) => 
                    setNotificationSettings(prev => ({ ...prev, marketingEmails: checked }))
                  }
                />
              </div>

              {/* Game Reminders */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <UserCheck className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="gameReminders">Recordatorios de Partidos</Label>
                    <p className="text-sm text-muted-foreground">
                      Recordatorios antes de tus partidos programados
                    </p>
                  </div>
                </div>
                <Switch
                  id="gameReminders"
                  name="gameReminders"
                  checked={notificationSettings.gameReminders}
                  onCheckedChange={(checked) => 
                    setNotificationSettings(prev => ({ ...prev, gameReminders: checked }))
                  }
                />
              </div>
            </div>

            <Button type="submit" disabled={isNotificationPending} className="w-full sm:w-auto">
              {isNotificationPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Configuración
                </>
              )}
            </Button>

            {/* Success/Error Messages */}
            {notificationState.success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md dark:bg-green-900/20 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-400">
                  {notificationState.message}
                </p>
              </div>
            )}
            
            {!notificationState.success && notificationState.message && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
                <p className="text-sm text-red-700 dark:text-red-400">
                  {notificationState.message}
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Configuración de Privacidad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePrivacySubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Profile Visibility */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label>Visibilidad del Perfil</Label>
                    <p className="text-sm text-muted-foreground">
                      Controla quién puede ver tu perfil
                    </p>
                  </div>
                </div>
                <div className="space-y-2 ml-8">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="public"
                      name="profileVisibility"
                      value="public"
                      checked={privacySettings.profileVisibility === "public"}
                      onChange={(e) => setPrivacySettings(prev => ({ 
                        ...prev, 
                        profileVisibility: e.target.value as "public" | "friends" | "private" 
                      }))}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="public" className="text-sm font-normal">
                      Público - Cualquiera puede ver tu perfil
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="friends"
                      name="profileVisibility"
                      value="friends"
                      checked={privacySettings.profileVisibility === "friends"}
                      onChange={(e) => setPrivacySettings(prev => ({ 
                        ...prev, 
                        profileVisibility: e.target.value as "public" | "friends" | "private" 
                      }))}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="friends" className="text-sm font-normal">
                      Solo amigos - Solo tus amigos pueden ver tu perfil
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="private"
                      name="profileVisibility"
                      value="private"
                      checked={privacySettings.profileVisibility === "private"}
                      onChange={(e) => setPrivacySettings(prev => ({ 
                        ...prev, 
                        profileVisibility: e.target.value as "public" | "friends" | "private" 
                      }))}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="private" className="text-sm font-normal">
                      Privado - Solo tú puedes ver tu perfil
                    </Label>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Show Email */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="showEmail">Mostrar Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Permite que otros usuarios vean tu correo electrónico
                    </p>
                  </div>
                </div>
                <Switch
                  id="showEmail"
                  name="showEmail"
                  checked={privacySettings.showEmail}
                  onCheckedChange={(checked) => 
                    setPrivacySettings(prev => ({ ...prev, showEmail: checked }))
                  }
                />
              </div>

              {/* Show Phone */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="showPhone">Mostrar Teléfono</Label>
                    <p className="text-sm text-muted-foreground">
                      Permite que otros usuarios vean tu número de teléfono
                    </p>
                  </div>
                </div>
                <Switch
                  id="showPhone"
                  name="showPhone"
                  checked={privacySettings.showPhone}
                  onCheckedChange={(checked) => 
                    setPrivacySettings(prev => ({ ...prev, showPhone: checked }))
                  }
                />
              </div>

              {/* Allow Friend Requests */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <UserCheck className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="allowFriendRequests">Permitir Solicitudes de Amistad</Label>
                    <p className="text-sm text-muted-foreground">
                      Otros usuarios pueden enviarte solicitudes de amistad
                    </p>
                  </div>
                </div>
                <Switch
                  id="allowFriendRequests"
                  name="allowFriendRequests"
                  checked={privacySettings.allowFriendRequests}
                  onCheckedChange={(checked) => 
                    setPrivacySettings(prev => ({ ...prev, allowFriendRequests: checked }))
                  }
                />
              </div>
            </div>

            <Button type="submit" disabled={isPrivacyPending} className="w-full sm:w-auto">
              {isPrivacyPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Configuración
                </>
              )}
            </Button>

            {/* Success/Error Messages */}
            {privacyState.success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md dark:bg-green-900/20 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-400">
                  {privacyState.message}
                </p>
              </div>
            )}
            
            {!privacyState.success && privacyState.message && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
                <p className="text-sm text-red-700 dark:text-red-400">
                  {privacyState.message}
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Zona de Peligro
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
            <h4 className="font-medium text-red-800 dark:text-red-400 mb-2">
              Eliminar Cuenta
            </h4>
            <p className="text-sm text-red-700 dark:text-red-300 mb-4">
              Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten en cuenta que esto eliminará permanentemente todos tus datos.
            </p>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => {
                // TODO: Implement delete account confirmation dialog
                toast.error("Funcionalidad de eliminar cuenta no implementada");
              }}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Eliminar Cuenta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
