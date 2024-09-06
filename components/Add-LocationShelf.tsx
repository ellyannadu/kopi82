'use client'

import { useState, ChangeEvent, FormEvent, TextareaHTMLAttributes, use } from "react";
import React from 'react'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Modal from './Modal';

const AddLocationShelf = () => {

    const router = useRouter();

    const [lsName, setLsName] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLsName(e.target.value);
        setError("");
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const checkResponse = await fetch(`/api/location_shelf?ls_name=${lsName}`);
            const checkData = await checkResponse.json();

            if (checkData.exists) {
                setIsModalOpen(true);
                return;
            }

            const response = await fetch('/api/location_shelf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ls_name: lsName
                }),
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Shelf Location name already exists.');
            }

            window.location.reload();
        } catch (error: any) {
            setError(error.message);
            setIsModalOpen(true);
        }
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className="mt-24 ml-40 mr-40">
            <p className="flex text-3xl text-[#483C32] font-bold justify-center mb-2">
                Add New Shelf Location
            </p>

            <div className="flex justify-end mt-10">
                <Link href="/Item">
                    <Button>Back</Button>
                </Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-4 mt-5 flex items-center space-x-4 justify-center">
                    <label className="text-lg font-bold text-[#483C32] mb-2">Shelf Location</label>
                    <input type="text" name="ls_name" value={lsName} onChange={handleChange} className="border border-[#C4C4C4] rounded-lg h-10 pl-2" />
                    <Button variant="outline" type="submit">
                        Add New Shelf Location
                    </Button>
                </div>
            </form>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Error">
                <p>{error}</p>
            </Modal>
        </div>
    )

}

export default AddLocationShelf