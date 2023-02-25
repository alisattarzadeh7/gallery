import {Button} from "@mui/material";
import React, {useEffect, useState} from "react"
import {useDropzone} from "react-dropzone";
import {toast} from "react-toastify";
import CustomDialog from "~/components/CustomDialog";
import CustomDropzone from "~/components/CustomDropzone";
import CustomTextField from "~/components/CustomTextField";
import {PhotoController} from "~/src/Utils/Controllers/PhotoController";
import CustomToast from "~/src/Utils/Helpers/CustomToast";
import {SetState} from "~/src/Utils/types/global";
import BackupIcon from '@mui/icons-material/Backup';
import {Controller, FieldValues, SubmitHandler, useForm} from "react-hook-form";

interface IAddPhotoDialogProps {
    open: boolean;
    setOpen: SetState<boolean>
    refetchData:()=>void
}


const AddPhotoDialog: React.FC<IAddPhotoDialogProps> = ({refetchData,open, setOpen}) => {
    const [file, setFile] = useState<{ preview: string | undefined ,uploadedFile:File | undefined}>({preview: undefined,uploadedFile:undefined});

    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
        clearErrors
    } = useForm();


    useEffect(()=>{
        if(!open){
            clearErrors()
            setFile({preview: undefined,uploadedFile:undefined})
        }
    },[open])

    const handleAddNewPhoto = async ({name,image}: any)=>{
        let formData = new FormData()
        formData.append('data',JSON.stringify({name}))
        formData.append('files.Img',image.uploadedFile)
        const result = await PhotoController.addNewPhoto(formData)
        await refetchData()
        if(result?.isSuccess){
            CustomToast('Photo Added successfully','success')
        }
        setOpen(false)
    }

    return (
        <>
            <CustomDialog open={open} setOpen={setOpen} title="Add new photo">
                <form onSubmit={handleSubmit(handleAddNewPhoto)}>
                    <Controller
                        name={"name"}
                        control={control}
                        rules={{required:true}}
                        render={({ field: { onChange, value } }) => (
                            <CustomTextField onChange={onChange} value={value} label={"Name"} error={Boolean(errors.name)}
                                             helperText={errors.name ? 'Name is required.' : ''} />
                        )}
                    />
                    <Controller
                        name={"image"}
                        control={control}
                        rules={{required:true}}
                        render={({ field: { onChange, value } }) => (
                            <CustomDropzone file={file} setFile={(val)=>{
                                setFile(val);
                                onChange(val)
                            }} error={Boolean(errors.image)} />
                        )}
                    />
                    {errors.image && <span className="text-[red]">Image is required</span>}
                    <Button variant="contained" type="submit">save</Button>
                </form>
            </CustomDialog>
        </>
    )
}

export default AddPhotoDialog