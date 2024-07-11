import prisma from "@/app/lib/prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export async function storePlayerQuery(name: string, tag: string, success: boolean) {
    try {
        if (success === true) {
            const findExisting = await prisma.searchPlayers.findFirst({
                where: {
                    name: {
                        equals: name,
                        mode: "insensitive"
                    },
                    tag: {
                        equals: tag,
                        mode: "insensitive"
                    },
                }
            })
            if (findExisting) return findExisting;
            const write = await prisma.searchPlayers.create({
                data: {
                    name: name.toLowerCase(),
                    tag: tag.toLowerCase(),
                    platform: 'riot',
                }
            })
            return write;
        }
        if (!success) {
            return { status: 403, message: `The search ${name}#${tag} didn't have any success while running.` }
        }
    } catch (err) {
        if (err instanceof PrismaClientValidationError) {

            return { status: 500, message: `The search ${name}#${tag} didn't have any success while running.`, error: err.message }
        }
        return { status: 500, message: `The search ${name}#${tag} didn't have any success while running.`, error: err }
    }
}