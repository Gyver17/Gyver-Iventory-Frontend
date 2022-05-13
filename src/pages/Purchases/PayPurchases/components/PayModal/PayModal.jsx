/* ------ Library Import ------ */
import React, { useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { useForm, useWatch } from "react-hook-form";

/* ------ Components Import ------ */
import Modal from "../../../../../components/Modal/Modal";
import DataTable from "../../../../../components/DataTable/DataTable";
import PageLoading from "../../../../../components/PageLoading/PageLoading";
import SessionExpired from "../../../../../components/SessionExpired/SessionExpired";
import ButtonForm from "../../../../../components/ButtonForm/ButtonForm";
import ToasterMessage, {
  toast,
} from "../../../../../components/ToasterMessage/ToasterMessage";
import NumberInvoiceField from "../../../../../components/NumberInvoiceField/NumberInvoiceField";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import {
  getPayHistory,
  createPayPurchases,
} from "../../../../../api/payPurchasesHistory";
import { AuthContext } from "../../../../../context/authProvider";
// import { expresions } from "../../../../../const/ExpReg";
import { columnModal } from "../../const/dataTableProps";

/* ------ Component ------ */
function PayModal({ form, setForm, queryClient }) {
  // Global State
  const [state, dispatch] = useContext(AuthContext);
  const { user, setting } = state;
  //const [id, setId] = useState("");
  const token = user.token;
  const { row } = form;

  // Props DataTable
  const { data, isSuccess, isError } = useQuery(
    ["getPayHistory", user],
    async () => {
      const products = await getPayHistory(row?.id, token, dispatch, toast);
      return products;
    }
  );

  const { control, handleSubmit, setValue, getValues } = useForm(
    {
      defaultValues: {
        amountPay: 0,
        amountPaid: parseFloat(row?.amount_pay) || 0,
        amountRemaining: parseFloat(row?.amount_remaining) || 0,
      },
    }
    // resolver: yupResolver(validationSchema),
  );

  const amountPay = useWatch({
    control,
    name: "amountPay",
  });

  const amountRemaining = useWatch({
    control,
    name: "amountRemaining",
  });

  useEffect(() => {
    if (row?.amount_remaining - amountPay < 0) {
      setValue("amountRemaining", 0);
    } else {
      setValue("amountRemaining", row?.amount_remaining - amountPay);
    }
  }, [setValue, amountPay, getValues, row, amountRemaining]);

  if (isError) {
    return <SessionExpired serverError={true} />;
  }

  const onSubmit = async (data) => {
    if (row?.amount_remaining - amountPay < 0) {
      return toast.error("Se esta abonando mas dinero del que se debe");
    }

    const date = new Date();
    const body = {
      date:
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear(),
      amount_pay: data.amountPay,
      amount_paid: data.amountPaid,
      amount_remaining: data.amountRemaining,
    };
    await toast.promise(
      createPayPurchases(row.id, token, body, dispatch, toast, queryClient),
      {
        loading: "Guardando...",
        success: <b>Pago Registrado Exitosamente</b>,
        error: <b>No Se Pudo Registrar</b>,
      }
    );
    
    setForm({
      isOpen: false,
      title: "",
      row: {},
    });
  };

  return (
    <>
      <ToasterMessage />
      <Modal isOpen={form.isOpen} setOpen={setForm} title={form.title}>
        {isSuccess ? (
          <section className={styles.container}>
            <DataTable
              title="Historial"
              numberOfEntries={[3, 6, 10]}
              headerButtons={[]}
              header={columnModal}
              data={data}
              aroundCurrentPage={5}
              formatDecimal={setting?.number_format}
              quantityDecimal={setting?.qty_decimal}
              moneySymbol={setting?.first_symbol}
              // action={action}
            />
            <div className={styles.numberInputs}>
              <NumberInvoiceField
                name="amountPay"
                control={control}
                quantityDecimal={setting?.qty_decimal}
                settingFormat={setting?.number_format}
                prefix={setting?.first_symbol + " "}
                title="Monto a Abonar"
                placeholder="Introducir Una Cantidad"
                icon="icon icondollar1"
                allowNegative={false}
                width={0}
                // disabled={!checkbox}
              />
              <NumberInvoiceField
                name="amountPaid"
                control={control}
                quantityDecimal={setting?.qty_decimal}
                settingFormat={setting?.number_format}
                prefix={setting?.first_symbol + " "}
                title="Monto Abonado"
                placeholder="Introducir Una Cantidad"
                icon="icon icondollar1"
                allowNegative={false}
                disabled={true}
              />
              <NumberInvoiceField
                name="amountRemaining"
                control={control}
                quantityDecimal={setting?.qty_decimal}
                settingFormat={setting?.number_format}
                prefix={setting?.first_symbol + " "}
                title="Monto Restante"
                placeholder="Introducir Una Cantidad"
                icon="icon icondollar1"
                allowNegative={false}
                disabled={true}
              />
            </div>
            <div className={styles.buttons}>
              <ButtonForm title="Abonar" onClick={handleSubmit(onSubmit)} />
            </div>
          </section>
        ) : (
          <PageLoading />
        )}
      </Modal>
    </>
  );
}

export default PayModal;
