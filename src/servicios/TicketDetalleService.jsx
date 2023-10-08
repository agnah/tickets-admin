import { useEffect, useState } from "react";
// import { apis } from '@constantes/constApis'

const TicketDetalleService = (id_ticket) => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const url = apis.API_TICKETS_DETALLE

  const getTicketDetail = async (id_ticket) => {
    let response = await fetch(
      `http://localhost:8000/api/tickets/?field=id&value=${Number(id_ticket)}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-token": "abc-123",
        },
      }
    );
    let result = await response.json();
    setLoading(false);
    setError(null);
    setTicket(result);
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error('La red no responde.')
    //   }
    //   return response.json()
    // })
    // .then((data) => {
    //   setTicket(data)
    //   setLoading(false)
    //   setError(null)
    // })
    // .catch((error) => {
    //   setTicket(null)

    // })
  };

  useEffect(() => {
    getTicketDetail(id_ticket);
  }, []);

  return { ticket, loading, error };
};

export default TicketDetalleService;
