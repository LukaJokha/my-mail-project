import { Outlet, Link } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "@/components/AuthContext"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Home, ShoppingCart } from "lucide-react"
import { Cart } from "@/components/Cart"
import { Nav } from "@/components/Nav"
import { HeaderAccountButtons } from "@/components/HeaderAccountButtons"

export const RootLayout = () => {
  const { user, initialLoading } = useContext(AuthContext)
  const [cartOpen, setCartOpen] = useState(false)
  const cartRef = useRef(null)
  const cartBtnRef = useRef(null)

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (
        !event.composedPath().includes(cartRef.current) &&
        !event.composedPath().includes(cartBtnRef.current)
      ) {
        setCartOpen(false)
      }
    }

    const closeOnEsc = (event) => {
      if (event.keyCode === 27 || event.code === "Escape") {
        setCartOpen(false)
      }
    }

    document.body.addEventListener("click", closeOnOutsideClick)
    document.body.addEventListener("keydown", closeOnEsc)
    return () => {
      document.body.removeEventListener("click", closeOnOutsideClick)
      document.body.removeEventListener("keyDown", closeOnEsc)
    }
  }, [setCartOpen])

  return (
    <div>
      <header className="border-b gap-2 py-4 relative md:static bg-[#f3f4f6] pr-4">
        <div className="flex items-center max-w-6xl mx-auto justify-between">
          <h1 className="text-2xl">
            <Button asChild variant="link">
              <Link to="/">
                <span className="hidden md:inline-block">Commerce</span>
                <Home size={24} strokeWidth={1.5} className="md:hidden" />
              </Link>
            </Button>
          </h1>

          <div className="flex items-center ml-auto">
            {initialLoading ? (
              <div className="flex w-full md:w-auto justify-evenly gap-4 md:ml-auto">
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
            ) : (
              <>
                <Nav />
                {user && (
                  <div className="flex items-center gap-4 mr-4">
                    <div className="flex items-center gap-4">
                      <div className="md:relative" ref={cartBtnRef}>
                        <Button
                          variant="icon"
                          className="relative"
                          onClick={() => setCartOpen(!cartOpen)}
                        >
                          <ShoppingCart />
                          <span className="absolute top-0 right-0">
                            <Badge className="bg-transparent hover:bg-transparent text-black px-0 py-0">
                              0
                            </Badge>
                          </span>
                        </Button>
                        {cartOpen && (
                          <Cart setCartOpen={setCartOpen} cartRef={cartRef} />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <HeaderAccountButtons />
              </>
            )}
          </div>
        </div>
      </header>
      <main className="my-8 px-4 xl:px-0 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}
