'use client'
import {
    Avatar,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import {useMutation} from "@tanstack/react-query";
import {fileApiAxios} from "@/config/axios-config";

import {Bounce} from "react-toastify";
import {useState} from "react";
import {useUser} from "@/hooks/useUser";


export default function ImageChange() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [selectedFile, setSelectedFile] = useState(null);

    const {refetch, user} = useUser();


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const deleteImage = useMutation({
        mutationFn: () => {
            return fileApiAxios.delete(`/api/v1/images?imageUrl=${user.imageUrl}`, {
                useAuth: true,
            })
        },
        onSuccess: () => {
            mutation.mutate(selectedFile);
        },
        onError: (error) => {
            toast.error('문제가 생겼습니다 관리자에게 문의해주세요.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    })

    const mutation = useMutation({
        mutationFn: (selectedFile) => {
            const formData = new FormData();
            formData.append("files", selectedFile)

            return fileApiAxios.put("/api/v1/members/image", formData, {
                useAuth: true,
            })
        },
        onSuccess: () => {
            onOpenChange();

            refetch();

            toast.success('이미지가 변경되었습니다', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    })

    const handleUpload = (e) => {
        e.preventDefault();
        if (user.imageUrl) {
            deleteImage.mutate()
        } else {
            mutation.mutate(selectedFile);
        }
    }

    const [previewSrc, setPreviewSrc] = useState(null);

    const handlePreviewChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewSrc(reader.result);
            setSelectedFile(file)
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewSrc(null);
        }
    };

    return (
        <div>
            <Button onPress={onOpen}>사진 변경</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">프로필 이미지 변경</ModalHeader>
                            <form onSubmit={handleUpload}>
                                <ModalBody>
                                    <div className={"flex flex-col items-center gap-3"}>
                                        <div>미리보기</div>
                                        <Avatar src={previewSrc} className={"w-44 h-44"}/>
                                        <input type={"file"} accept={"image/*"} onChange={handlePreviewChange}/>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color={"primary"} type={"submit"}
                                            isLoading={mutation.isPending}>수정</Button>
                                    <Button onPress={onOpenChange}>취소</Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}