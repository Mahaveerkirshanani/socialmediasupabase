import Login from "@/components/auth/login"
import Register from "@/components/auth/register"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image"

const login = () =>{
  return (
    <div className="h-screen w-full my-20 flex-col gap-3 flex items-center justify-start  ">

      <div className="flex flex-col gap-0 items-center justify-center ">
        <Image  src={"/logooo.svg"} width={150} height={150} alt="Logo" className=""/>
        <p className=" text-black/80 text-sm tracking-wider font-semibold">Freelancers community for developers</p>
      </div>

    <Tabs defaultValue="login" className="w-[400px] px-2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Login />
      </TabsContent>
      <TabsContent value="register">
     <Register />
      </TabsContent>
    </Tabs>
    </div>

  )
}


export default login