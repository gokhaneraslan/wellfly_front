import Header from "@/app/_components/Header";
import { RegisterUserForm } from "@/components/forms/users/RegisterUserForm";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegisterClinicForm } from "@/components/forms/clinics/RegisterClinicForm";


const Register = () => {
  return (
    <div>
      <Header />
      <section className="remove-scrollbar container my-auto bg-white">
        <div className="sub-container flex max-w-[50rem]">
          <div className="flex gap-5 justify-center pt-10">
            <Image
              src="/assets/icons/logo.svg"
              height={1000}
              width={1000}
              alt="user"
              className="mb-5 h-10 w-fit"
            />
            <h1 className="header  text-dark-400">Hi there 👋</h1>
          </div>
          { /*<section className="mb-12 flex flex-col items-center space-y-2 w-full">
            <div className="text-lg text-dark-700 flex gap-2"><p>Get</p><p>Started</p><p>with</p><p>Sign Up</p><p>or</p>
                <Link href="/users/login" className="text-green-500">Sign In</Link>
            </div>
          </section> */}
          <Tabs defaultValue="user" className="flex flex-col items-center">
            <TabsList className=" grid-cols-2 mb-5 w-[350px] h-[3rem] flex items-center rounded-lg justify-between px-3 bg-light-200 text-black">
              <TabsTrigger className="text-lg cursor-pointer hover:scale-110 transition-all ease-in-out" value="user">User Registration</TabsTrigger>
              <TabsTrigger className="text-lg cursor-pointer hover:scale-110 transition-all ease-in-out" value="clinic">Clinic Record</TabsTrigger>
            </TabsList>
            <TabsContent className="w-[420px]" value="user"> <RegisterUserForm /></TabsContent>
            <TabsContent className="w-[40rem] flex justify-center" value="clinic"> <RegisterClinicForm /> </TabsContent>
          </Tabs>
          <div className="text-14-regular mt-20 flex justify-center">
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;