
// import { currentUser } from '@clerk/nextjs/server'
// import { redirect } from 'next/navigation';


// async function AdminPage() {
//     const user = await currentUser();


//     //user is not logged in
//     if(!user) redirect("/")
//     const adminEmail = process.env.ADMIN_EMAIL;
//     // const userEmail = user.emailAddresses[0]?.emailAddress;
//     const userEmail = user.primaryEmailAddress?.emailAddress;


//     console.log("ADMIN_EMAIL:", adminEmail);
//     console.log("USER_EMAIL:", userEmail);

//     if (!adminEmail) {
//         throw new Error("ADMIN_EMAIL is not defined");
//     }

//     // Logged in but not admin → home
//     if (userEmail !== adminEmail) {
//         redirect("/");
//     }
//     //user is not the admin
//     // if(!adminEmail || userEmail !== adminEmail) redirect("/")


//     return <div>You are the Admin</div>
// }

// export default AdminPage




import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


async function AdminPage() {
  const user = await currentUser();

  // user is not logged in
  if (!user) redirect("/");

  const adminEmail = process.env.ADMIN_EMAIL;
  const userEmail = user.emailAddresses[0]?.emailAddress;

  // user is not the admin
  if (!adminEmail || userEmail !== adminEmail) redirect("/dashboard");

  return <div>You are the Admin</div>;
}

export default AdminPage;