import prisma from "@/lib/db";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// GET function to fetch all data from Purchase Details model
export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.log("Error fetching categories", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST function to create a new Category
export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const { category_name } = res;

    // Fetch all categories and filter manually in JavaScript (case-insensitive comparison)
    const existingCategory = await prisma.category.findFirst({
      where: {
        category_name: {
          equals: category_name.toLowerCase(), // Normalize the input
        },
      },
    });

    // Check if a category with the same normalized name exists
    if (existingCategory && existingCategory.category_name.toLowerCase() === category_name.toLowerCase()) {
      return NextResponse.json({ error: "Category already exists" }, { status: 400 });
    }

    // If no existing category, create a new one
    const created = await prisma.category.create({
      data: {
        category_name,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.log("Error creating Category", error);
    return NextResponse.json({ error: "Failed to create Category" }, { status: 500 });
  }
}