/* ------ Library Import ------ */
import React, { useState, useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

/* ------ Components Import ------ */
import Header from "./components/Header/Header";
import InvoiceById from "./components/InvoiceById/InvoiceById";
import DataTable from "../../../components/DataTable/DataTable";
import SessionExpired from "../../../components/SessionExpired/SessionExpired";
import { toast } from "../../../components/ToasterMessage/ToasterMessage";
import PageLoading from "../../../components/PageLoading/PageLoading";
import MinWidth from "../../../components/MinWidth/MinWidth";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { getInvoiceReturnPurchases } from "../../../api/invoicePurchases";
import formatDate from "../../../helpers/formatDate";
import { columnInvoice } from "./const/dataTableProps";
import { AuthContext } from "../../../context/authProvider";

/* ------ Component ------ */
const ReturnPurchases = () => {
  // Global State
  const [state, dispatch] = useContext(AuthContext);
  const { user, setting } = state;
  const token = user.token;

  const day = new Date();
  const [startDate, setStartDate] = useState(new Date(day.setDate(0)));
  const [minWidth, setMinWidth] = useState(false);
  const [renderInvoiceById, setRenderInvoiceById] = useState({
    render: false,
    row: {},
  });

  // Props DataTable
  const { data, isSuccess, isError } = useQuery(
    ["getReturnPurchases", startDate],
    async () => {
      const date = formatDate(startDate);
      const invoice = await getInvoiceReturnPurchases(
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
    queryClient.invalidateQueries("getReturnPurchases");
  };

  const action = [
    {
      icon: "icon iconplus",
      render: true,
      onClick: (row) => setRenderInvoiceById({ render: true, row: row }),
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
      {!renderInvoiceById?.render ? (
        <div className={styles.container}>
          <Header
            title="Compras a Devolver"
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
      ) : (
        <InvoiceById
          renderInvoiceById={renderInvoiceById}
          setRenderInvoiceById={setRenderInvoiceById}
        />
      )}
    </>
  );
};

export default ReturnPurchases;
