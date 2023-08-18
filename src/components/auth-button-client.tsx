'use client'
import { type Session , createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import {Button} from '@nextui-org/button';



export function AuthButton({session}:{session: Session|null } ) {
   
    const supabase = createClientComponentClient()
    const router=useRouter()

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'  // cuando inicie seccion el usuario. nos devolvera las credenciales de usuario, una seccion, el token, y eso nosotros lo tneemos que guardar en algun sitio, y eso lo guaradremos en la cookie,  
            }
        })
    }

    const hadleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <header>
            {
                session === null ? (
                    <button onClick={handleSignIn} type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                        Iniciar sesion con Github
                    </button>
                )
                    : (<Button onClick={hadleSignOut}>Cerrar sesion</Button>)
            }


        </header>
    )
}

// redirectTo: 'http://localhost:3000/auth/callback'  // cuando inicie seccion el usuario. nos devolvera las credenciales de usuario,
// una seccion, el token, y eso nosotros lo tneemos que guardar en algun sitio, y eso lo guardaremos en la cookie,
//esta es una url que crearemos nosotros para que llamamemos a un peque;o metodo para que guarde esto en una cookie