import {Button} from "@mui/material";
import axios from "axios";
import {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useEffect} from "react"
import {Controller, useForm} from "react-hook-form";
import CustomDropzone from "~/components/CustomDropzone";
import CustomTextField from "~/components/CustomTextField";
import UserController from "~/src/Utils/Controllers/UserController";
import cookies, { CookieAttributes } from 'js-cookie';
import Route from "~/src/Utils/Facades/Route";
import CustomToast from "~/src/Utils/Helpers/CustomToast";
import {useAppDispatch, useAppSelector} from "~/src/Utils/Hooks";
import LoadingButton from '@mui/lab/LoadingButton';
import { setLoading } from "~/src/Utils/Redux/Slices/layout";

interface IloginProps {

}

const login: NextPage<IloginProps> = () => {


    const loading = useAppSelector(state=>state.layout.loading)
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
        clearErrors
    } = useForm();
    const router = useRouter();

    useEffect(()=>{
        cookies.remove('bearerToken')
    },[])

    const handleLogin = async (data: any) => {
        dispatch(setLoading(true))
       try{
           const {response,isSuccess} = await UserController.login(data)
           if(isSuccess){
               cookies.set('bearerToken', response.jwt, {
                   expires: 604800,
                   httpOnly: false,
                   secure: false,
                   sameSite: 'lax',
               });
               await router.push(Route.Home.path)
               CustomToast('welcome','success')
           }

       }catch(err){

       }

        dispatch(setLoading(false))

    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="flex justify-center items-center w-screen h-screen flex-col">
                    <h1 className="text-5xl">Login</h1>
                    <div className="p-10">
                        <Controller
                            name={"identifier"}
                            control={control}
                            rules={{required: true}}
                            render={({field: {onChange, value}}) => (
                                <CustomTextField onChange={onChange} value={value} label={"username"}
                                                 error={Boolean(errors.identifier)}
                                                 helperText={errors.identifier ? 'Username is required.' : ''}/>
                            )}
                        />
                    </div>
                    <div className="p-10">
                        <Controller
                            name={"password"}
                            control={control}
                            rules={{required: true}}
                            render={({field: {onChange, value}}) => (
                                <CustomTextField onChange={onChange} value={value} label={"password"}
                                                 error={Boolean(errors.password)}
                                                 helperText={errors.password ? 'Password is required.' : ''}/>
                            )}
                        />
                    </div>
                    <LoadingButton  variant="contained" type="submit" loading={loading}>Login</LoadingButton>

                </div>
            </form>
        </div>
    )
}

export default login
