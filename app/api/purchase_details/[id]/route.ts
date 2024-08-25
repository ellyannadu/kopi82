import { prisma } from "@/utils/prisma";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET (request: Request, { params } : { params  : { id: string}} ){
    const po_id = params.id
    const purchase_details = await prisma.purchase_details.findMany({
        where: {
            po_id: parseInt(po_id, 10)
        }
    });
    return NextResponse.json(purchase_details);
}

export async function PUT (request: Request, { params } : { params : {id: string}}) {
    const po_id = params.id;
    const json = await request.json();
    const updatedPurchaseDetails = await prisma.purchase_details.updateMany({
        where: {
            po_id: parseInt(po_id, 10)
        },
        data: json
    })

    return NextResponse.json(updatedPurchaseDetails);
}

export async function DELETE (request: Request, { params } : { params : { id: string}}){
    const po_id = params.id;
    const deletedPurchaseDetails = await prisma.purchase_details.deleteMany({
        where: {
            po_id: parseInt(po_id, 10)
        }
    })

    return NextResponse.json(deletedPurchaseDetails);
}