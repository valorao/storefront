import { SearchIcon, XCircle } from "lucide-react";
import { searchSchema } from "./searchSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import { z } from "zod";
import * as React from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";

type SearchForm = z.infer<typeof searchSchema>;

export default function SearchBar({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    const queryParams = useSearchParams();
    const router = useRouter();
    const [output, setOutput] = useState('');
    const [value, setValue] = useState('');
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
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(!open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function searchQuery(data: SearchForm) {
        setOutput(JSON.stringify(data, null, 2));
        const name = data.search.split("#")[0];
        const tag = data.search.split("#")[1];
        setOpen(false);
        router.push(`/profiles/${name}/${tag}?engine=vlr&region=br`);
    }

    return (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className={errors.search ? "border-red-700" : ""}>
                    <div className="flex flex-row justify-between items-center">
                        <form
                            className="w-full h-full"
                            onSubmit={handleSubmit(searchQuery)}>
                            <div className="relative">
                                <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                                <div className="flex-row flex justify-center items-center text-center">
                                    <Input
                                        type="search"
                                        placeholder="Buscar jogadores"
                                        className="pl-8 outline-none w-full py-0"
                                        {...register("search", {
                                            onChange: (e) => {
                                                if (!e.target.value.trim()) {
                                                    clearErrors('search');
                                                }
                                            }
                                        })}
                                    />
                                    <XCircle className="h-5 w-5 text-muted-foreground cursor-pointer mx-2" onClick={() => setOpen(false)} />
                                </div>

                                {errors.search ? (
                                    <>
                                        <Separator className="my-1 bg-zinc-500" />
                                        <div className="items-center justify-start text-center flex m-2">
                                            <h1 className="text-sm text-red-700">{errors.search.message}</h1>
                                        </div>
                                    </>
                                ) : ""}
                            </div>
                        </form>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
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
