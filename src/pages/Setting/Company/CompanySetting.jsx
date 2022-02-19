import AccountingSetting from "./components/AccountingSetting/AccountingSetting"
import CompanyData from "./components/CompanyData/CompanyData"
import InputFile from "../../../components/InputFile/InputFile";
import styles from "./style.module.css"
import { useForm } from "react-hook-form";

const CompanySetting = () => {
    const {
        control,
        // handleSubmit,
        // reset,
        setValue,
        // formState: { errors },
    } = useForm({
        // defaultValues: values,
        // resolver: yupResolver(validationSchema),
    });
    return (
        <div className={styles.container}>
            <InputFile
                img='https://th.bing.com/th/id/OIP.zzsPV8qzehxZNbSXyQo1aQHaHa?pid=ImgDet&w=200&h=200&c=7'
                name='files'
            />
            <div className={styles.body}>
                <CompanyData control={control}/>
                <i className={styles.separator} />
                <AccountingSetting control={control} setSelectValue={setValue}/>
            </div>
        </div>
    )
}

export default CompanySetting
