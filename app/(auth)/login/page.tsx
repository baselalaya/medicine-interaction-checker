import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Log In to MedInteract</h1>
      <LoginForm />
    </div>
  );
}
