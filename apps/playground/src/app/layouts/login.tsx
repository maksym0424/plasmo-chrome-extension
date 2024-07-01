import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button, Card } from "@mui/material";
import Image from "next/image";
import * as React from "react";

export default function Login() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Card className="p-32 justify-center space-x-10">
        <Image src="/logo.png" width={250} height={200} alt="Ara logo" className="mb-10" />

        <Button variant="contained" disableElevation>
          <LoginLink>Sign in</LoginLink>
        </Button>
        <Button variant="contained" disableElevation>
          <RegisterLink>Sign up</RegisterLink>
        </Button>
      </Card>
    </div>
  );
}
