import Alert from "@/components/alert/Alert";
import Form from "@/components/form/form";
import ImageUpload from "@/functions/ImageUpload";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile - CSE Bootcamp 2.0",
  description: "created with ❤️ by Brijendra Singh",
};

export default async function Page({ searchParams: user }) {
  if (!user.email) {
    redirect("/api/auth/signin");
  }
  const id = user.email.split("@")[0];
  let data = {
    name: "",
    instagram: "",
    linkdin: "",
    github: "",
    about: "",
    id: id,
  };

  const loadTimer = setTimeout(() => {
    return <Alert>unable to connect to the server. Please try again later</Alert>;
  }, 5000);

  try {
    const response = await fetch(`${process.env.HOST}/api/db/get`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });

    data = await response.json();
    clearTimeout(loadTimer);
  } catch (err) {
    return <Alert>Something went wrong</Alert>
  }

  return (
    <>
      <ImageUpload name={id} />
      <Form prevData={data} user={id} host={process.env.HOST} />
    </>
  );
}
