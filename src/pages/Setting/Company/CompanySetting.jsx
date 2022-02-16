import AccountingSetting from "./components/AccountingSetting/AccountingSetting"
import CompanyData from "./components/CompanyData/CompanyData"
import styles from "./style.module.css"

const CompanySetting = () => {
    return (
        <div className={styles.container}>
            <CompanyData />
            <AccountingSetting />
        </div>
    )
}

export default CompanySetting
