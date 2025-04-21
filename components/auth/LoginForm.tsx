import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"



export const LoginForm = () => {
    return (
        <div className="  flex justify-center w-full   ">
        <Tabs dir="rtl" defaultValue="customer" className="w-full md:w-1/2 bg-white p-8 mt-10 rounded-lg shadow-md">
          <TabsList className="w-full  grid grid-cols-2 mb-8">
            <TabsTrigger value="customer" className="text-center py-2">كعميل</TabsTrigger>
            <TabsTrigger value="technician" className="text-center py-2">كصنايعي</TabsTrigger>
          </TabsList>
          
          <TabsContent value="customer">
            <form className="space-y-6">
              <div>
                <label htmlFor="loginEmail" className="block text-sm font-medium mb-2">الايميل</label>
                <Input id="loginEmail" type="email" placeholder="اكتب ايميلك" className="w-full" />
              </div>
              
              <div>
                <label htmlFor="loginPassword" className="block text-sm font-medium mb-2">كلمة المرور</label>
                <Input id="loginPassword" type="password" placeholder="اكتب كلمة المرور" className="w-full" />
              </div>
              
              <div className="flex items-center">
                <Checkbox id="remember" className="me-2" />
                <label htmlFor="remember" className="text-sm">تذكرني</label>
              </div>
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                تسجيل الدخول
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="technician">
            <form className="space-y-6">
              <div>
                <label htmlFor="loginEmailTech" className="block text-sm font-medium mb-2">الايميل</label>
                <Input id="loginEmailTech" type="email" placeholder="اكتب ايميلك" className="w-full" />
              </div>
              
              <div>
                <label htmlFor="loginPasswordTech" className="block text-sm font-medium mb-2">كلمة المرور</label>
                <Input id="loginPasswordTech" type="password" placeholder="اكتب كلمة المرور" className="w-full" />
              </div>
              
              <div className="flex items-center">
                <Checkbox id="rememberTech" className="m-2" />
                <label htmlFor="rememberTech" className="text-sm">تذكرني</label>
              </div>
              
              <Button type="submit" className="w-full bg-blue-600 ho ver:bg-blue-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                تسجيل الدخول
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    )
}