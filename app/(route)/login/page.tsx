import Header from "@/app/_components/Header";
import { UserForm } from "@/components/forms/users/UserForm";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  return (
    <div>
      <Header />
      <section className="remove-scrollbar container my-auto bg-white">
        <div className="sub-container max-w-[496px]">
          <div className="flex gap-5 justify-center pt-10">
            <Image
              src="/assets/icons/logo.svg"
              height={1000}
              width={1000}
              alt="user"
              className="mb-12 h-10 w-fit"
            />
            <h1 className="header text-dark-400">Hi there 👋</h1>
          </div>
          {/*<section className="mb-12 space-y-4 flex justify-center">
            <div className="text-lg text-dark-700 flex gap-2"><p>Get</p><p>Started</p><p>with</p><p>Sign In</p><p>or</p>
                <Link href="/users/register" className="text-green-500">Sign Up</Link>
            </div>
          </section> */}
          <UserForm/>

          <div className="text-14-regular mt-20 flex justify-center">
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;