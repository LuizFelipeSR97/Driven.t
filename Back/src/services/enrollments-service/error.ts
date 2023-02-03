import { ApplicationError } from "@/protocols";

export function invalidEnrollmentError(): ApplicationError {
  return {
    name: "InvalidEnrollmentError",
    message: "email or password are incorrect",
  };
}
