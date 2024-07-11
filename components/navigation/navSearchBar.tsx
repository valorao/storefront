import { Search, SearchIcon, X } from "lucide-react";
import { searchSchema } from "./searchSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { z } from "zod";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "../ui/badge";
import { Dialog, DialogFooter, DialogOverlay, DialogPortal } from "../ui/dialog";

type SearchForm = z.infer<typeof searchSchema>;

export default function SearchBar({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    const queryParams = useSearchParams();
    const router = useRouter();
    const [value, setValue] = useState('');
    const [results, setResults] = useState(null);
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<SearchForm>({
        resolver: zodResolver(searchSchema),
    });

    useEffect(() => {
        const searchQuery = queryParams.get('q');
        if (searchQuery) {
            setOpen(true);
            setValue(searchQuery);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (value.trim()) {
            const encodedValue = encodeURIComponent(value);
            router.replace(`?q=${encodedValue}`, { scroll: false });
        } else {
            router.replace(``, { scroll: false });
        }
    }, [router, value]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen(!open); }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function searchQuery(data: SearchForm) {
        const name = data.search.split("#")[0];
        const tag = data.search.split("#")[1];
        setOpen(false);
        router.push(`/profiles/${name}/${tag}?e=vlr&rg=br`);
    }
    function tryResult(e: any) {
        clearErrors("search")
        const value = e.target.value;
        if (!value) {
            setResults(null)
        }
        if (!errors.search && value) {
            setResults(value)
        }
    }

    return (
        <div className="flex items-center flex-col justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className={`w-96 md:w-full ${errors.search ? "border-red-700 p-1" : ""}`}>
                    <div className="flex flex-row items-center">
                        <div className="flex-1 flex-row items-center mr-2">
                            <form
                                className="w-full h-full"
                                onSubmit={handleSubmit(searchQuery)}>
                                <div className="flex gap-2 items-center">
                                    <div className="flex-1 relative">
                                        <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                                        <div className="flex-row flex justify-center items-center text-center">
                                            <Input
                                                type="search"
                                                placeholder="Busque por jogadores. Use NOME#BR1"
                                                className="pl-8 outline-none w-full py-0 autofill:bg-background"
                                                {...register('search', {
                                                    onChange: (e) => {
                                                        tryResult(e)
                                                    },
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="justify-end" disabled={errors.search ? true : false}>
                                        <Badge className={`flex items-center gap-0.5 ${errors.search ? 'bg-red-700 text-white hover:bg-red-900' : ''}`}>
                                            <Search className="size-3 antialiased" />
                                            Buscar
                                        </Badge>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="flex gap-2 items-center text-center">
                            <div
                                className='rounded-full p-1 size-5 items-center cursor-pointer justify-center flex mr-2 bg-white'
                                onClick={() => setOpen(false)}
                            >
                                <X className=" text-black" />
                            </div>
                        </div>
                    </div>
                    {errors.search && <DialogFooter>
                        <div className="flex flex-col items-center w-full justify-center mt-[-10px]">
                            <Separator className="bg-zinc-500" />
                            <div className="items-center justify-start text-center flex my-2">
                                <h1 className="text-sm text-red-700">{errors.search.message}</h1>
                            </div>
                        </div>
                    </DialogFooter>}
                    {results && <DialogFooter>
                        <div className="flex flex-col w-full gap-2 mb-2">
                            <div className="flex flex-col items-center w-full justify-center mt-[-10px]">
                                <Separator className="bg-zinc-500" />
                            </div>
                            <h1 className="flex justify-start mx-3 font-bold">Resultados:</h1>
                            <div
                                className="items-center justify-center text-center flex my-2 rounded-xl p-2 bg-background border mx-20 hover:border-white transition-all cursor-pointer"
                                onClick={handleSubmit(searchQuery)}
                            >
                                <h1 className="text-white text-lg font-semibold">{results}</h1>
                            </div>
                        </div>
                    </DialogFooter>}
                </DialogContent>
            </Dialog>
        </div>
    );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg transition-transform",
                className
            )}
            {...props}
        >
            {children}
        </DialogPrimitive.Content>
    </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName