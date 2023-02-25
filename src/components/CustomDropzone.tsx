import BackupIcon from "@mui/icons-material/Backup";
import React from "react"
import {useDropzone} from "react-dropzone";
import {SetState} from "~/src/Utils/types/global";

interface ICustomDropzoneProps {
    file:{preview:string | undefined,uploadedFile:File | undefined}
    setFile:SetState<{preview:string | undefined,uploadedFile:File | undefined}>
    error?:boolean
    inputProps?:React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

const CustomDropzone: React.FC<ICustomDropzoneProps> = ({file,error,setFile,inputProps}) => {
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFile({
                preview: URL.createObjectURL(acceptedFiles[0]),
                uploadedFile:acceptedFiles[0]
            });
        }
    });
    return (
        <>
            <div {...getRootProps()}
                 className={` cursor-pointer relative  h-[200px] rounded-md border-dashed border-[3px] flex justify-center items-center ${error ? 'border-rose-600' : ''}`}>
                <input {...getInputProps()} {...inputProps} />
                <BackupIcon className="opacity-20"/>
                {
                    file.preview && <div className="absolute  bottom-0 left-0 rounded-md overflow-hidden ">
                        <img
                            src={file.preview}
                            className="h-[100px] w-[100px]"
                            onLoad={() => {
                                if (file) if (typeof file.preview === "string") {
                                    URL.revokeObjectURL(file.preview)
                                }
                            }}
                        />
                    </div>
                }
            </div>
        </>
    )
}

export default CustomDropzone