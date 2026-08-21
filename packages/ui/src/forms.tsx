"use client";

import { useState, type FormEvent, type FormHTMLAttributes } from "react";
import { Button } from "./shared";

export type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};
export type LoginFormProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
> & {
  onSubmit: (values: LoginFormValues) => void | Promise<void>;
  loading?: boolean;
  error?: string;
  forgotPasswordHref?: string;
  showRememberMe?: boolean;
};

export function LoginForm({
  onSubmit,
  loading,
  error,
  forgotPasswordHref,
  showRememberMe = true,
  className,
  ...props
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onSubmit({ email, password, remember });
  };
  return (
    <form
      className={`yd-login ${className ?? ""}`}
      onSubmit={submit}
      {...props}
    >
      <header>
        <span className="yd-login__mark">Y</span>
        <p>Bienvenue</p>
        <h2>Connectez-vous à votre espace</h2>
      </header>
      {error ? (
        <div className="yd-login__error" role="alert">
          {error}
        </div>
      ) : null}
      <label>
        E-mail
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Mot de passe
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          minLength={8}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <div className="yd-login__options">
        {showRememberMe ? (
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
            Se souvenir de moi
          </label>
        ) : (
          <span />
        )}
        {forgotPasswordHref ? (
          <a href={forgotPasswordHref}>Mot de passe oublié ?</a>
        ) : null}
      </div>
      <Button type="submit" loading={loading}>
        Se connecter
      </Button>
    </form>
  );
}
