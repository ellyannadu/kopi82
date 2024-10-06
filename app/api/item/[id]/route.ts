import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET method to fetch a unit by ID or check if a unit_name exists
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id
    const item = await prisma.item.findUnique({
        where: {
            item_id: Number(id)
        }
    });
    return NextResponse.json(item);
}

// PUT method to update a new unit
export async function PUT(request: Request, { params }: { params: { id: string }}) {
    const id = params.id
    const json = await request.json()
    const { item_name, description, unit_id, category_id } = json;
    const updatedItem = await prisma.item.update({
        where: {
            item_id: Number(id)
        },
        data: {
            item_name,
            description,
            unit_id,
            category_id
        }
    })
    return NextResponse.json(updatedItem);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const itemId = Number(params.id);
  
    try {
      const updatedFields = await request.json();  // This will contain only the fields to update
  
      const updatedItem = await prisma.item.update({
        where: { item_id: itemId },
        data: updatedFields,  // Update only the provided fields
      });
  
      return NextResponse.json(updatedItem);
    } catch (error) {
      console.log("Error updating item", error);
      return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
    }
  }

// DELETE method to delete a unit by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const deletedItem = await prisma.item.delete({
        where: {
            item_id: parseInt(id, 10)
        }
    });

    return NextResponse.json(deletedItem);
}