import React, { useState, useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
// import { useForm, useWatch } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

/* ------ Components Import ------ */
import Header from "./components/Header/Header";
import PayModal from "./components/PayModal/PayModal";
// import ButtonForm from "../../../components/ButtonForm/ButtonForm";
// import TextArea from "../../../components/TextArea/TextArea";
import DataTable from "../../../components/DataTable/DataTable";
// import ProductModal from "./components/ProductModal/ProductModal";
import SessionExpired from "../../../components/SessionExpired/SessionExpired";
import ToasterMessage, {
  toast,
} from "../../../components/ToasterMessage/ToasterMessage";
import PageLoading from "../../../components/PageLoading/PageLoading";
// import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import MinWidth from "../../../components/MinWidth/MinWidth";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
// import { getSupplier } from "../../../api/supplier";
// import { getEmployee } from "../../../api/employee";
// import { getNumbersInvoice } from "../../../api/numbersInvoice";
import { getInvoicePayPurchases } from "../../../api/invoicePurchases";
import formatDate from "../../../helpers/formatDate";
import { columnInvoice } from "./const/dataTableProps";
import { AuthContext } from "../../../context/authProvider";

/* ------ Component ------ */
const PayPurchases = () => {
  // Global State
  const [state, dispatch] = useContext(AuthContext);
  const { user, setting } = state;
  const token = user.token;

  const day = new Date();
  const [startDate, setStartDate] = useState(new Date(day.setDate(0)));
  const [minWidth, setMinWidth] = useState(false);
  const [form, setForm] = useState({
    isOpen: false,
    title: "",
    row: {},
  });

  // Props DataTable
  const { data, isSuccess, isError } = useQuery(
    ["getPayPurchases", startDate],
    async () => {
      const date = formatDate(startDate);
      const invoice = await getInvoicePayPurchases(
        date,
        token,
        dispatch,
        toast
      );
      return invoice;
    }
  );

  const queryClient = useQueryClient();

  const findInvoiceByDate = (date) => {
    setStartDate(date);
    queryClient.invalidateQueries("getPayPurchases");
  };

  const action = [
    {
      icon: "icon iconplus",
      render: true,
      onClick: (row) => {
        setForm({
          row: row,
          isOpen: true,
          title: "Historial de Pago",
        });
      },
    },
  ];

  useEffect(() => {
    setMinWidth(window.innerWidth < 800 && window.innerHeight < 600);
  }, [setMinWidth]);

  if (isError) {
    return <SessionExpired serverError={true} />;
  }

  if (minWidth) {
    return (
      <MinWidth
        content={"Debe Tener Una Resolución De Pantalla Mayor a 800x600px"}
      />
    );
  }

  return (
    <>
      <ToasterMessage />
      <div className={styles.container}>
        <Header
          title="Compras Por Pagar"
          startDate={startDate}
          setStartDate={findInvoiceByDate}
        />
        {isSuccess ? (
          <DataTable
            numberOfEntries={[5, 10, 15, 20]}
            // searchData={searchData}
            headerButtons={[]}
            header={columnInvoice}
            data={data}
            aroundCurrentPage={5}
            formatDecimal={setting?.number_format}
            quantityDecimal={setting?.qty_decimal}
            moneySymbol={setting?.first_symbol}
            action={action}
          />
        ) : (
          <PageLoading />
        )}
      </div>
      {form.isOpen && (
        <PayModal
          form={form}
          setForm={setForm}
          queryClient={queryClient}
        />
      )}
    </>
  );
};

export default PayPurchases;
