import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Button,
  ImageAccordion,
  LoginForm,
  Pagination,
  SelectMenu,
  SignupForm,
  Switch,
  TextField,
} from "../src";

describe("YoDev UI", () => {
  it("exposes an accessible loading button", () => {
    render(<Button loading>Envoyer</Button>);
    expect(screen.getByRole("button", { name: "Envoyer" })).toBeDisabled();
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });
  it("changes the active accordion panel", () => {
    render(
      <ImageAccordion
        items={[
          { id: "one", title: "Une", image: { src: "/one.jpg", alt: "Une" } },
          { id: "two", title: "Deux", image: { src: "/two.jpg", alt: "Deux" } },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Deux/ }));
    expect(screen.getByRole("button", { name: /Deux/ })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
  it("selects a menu item", () => {
    const onValueChange = vi.fn();
    render(
      <SelectMenu
        items={[{ value: "react", label: "React" }]}
        onValueChange={onValueChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Sélectionner/ }));
    fireEvent.click(screen.getByRole("option", { name: /React/ }));
    expect(onValueChange).toHaveBeenCalledWith("react");
  });
  it("submits normalized login values", () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "yoann@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));
    expect(onSubmit).toHaveBeenCalledWith({
      email: "yoann@example.com",
      password: "password123",
      remember: false,
    });
  });
  it("keeps switches native and accessible", () => {
    render(<Switch label="Aperçus interactifs" />);
    const control = screen.getByRole("switch", {
      name: "Aperçus interactifs",
    });
    fireEvent.click(control);
    expect(control).toBeChecked();
  });
  it("announces text field errors", () => {
    render(<TextField label="Nom" error="Ce champ est requis" />);
    expect(screen.getByLabelText("Nom")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByText("Ce champ est requis")).toBeVisible();
  });
  it("changes pages with a bounded pagination", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} pageCount={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Page suivante" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
  it("submits signup values", () => {
    const onSubmit = vi.fn();
    render(<SignupForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText("Nom"), {
      target: { value: "Yoann" },
    });
    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "yoann@example.com" },
    });
    fireEvent.click(
      screen.getByRole("checkbox", {
        name: "J’accepte les conditions d’utilisation",
      }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Créer mon compte" }));
    expect(onSubmit).toHaveBeenCalledWith({
      name: "Yoann",
      email: "yoann@example.com",
      accepted: true,
    });
  });
});
