import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "@/config/axios-config";
import { toast } from "react-toastify";
import { useState } from "react";

// 나의 캐시 사용 내역
const fetchMyCashLog = async (page) => {
  const res = await axios.get(`api/v1/cashLog/me?page=${page}`, {
    ...axios.defaults,
    useAuth: true,
  });

  return res.data;
};

export const useMyCashLog = (page) => {
  const {
    data: myCashLog,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["myCashLog", page],
    queryFn: () => fetchMyCashLog(page),
    retry: 0,
    placeholderData: keepPreviousData,
  });

  return { myCashLog, isLoading, isFetching, isError, error };
};

/**  결제하기 창 */
const fetchReservationForPay = async (reserveId) => {
  const res = await axios.get(`api/v1/cashLog/payByCash/${reserveId}`, {
    ...axios.defaults,
    useAuth: true,
  });

  console.log("fetchReservationForPay");

  return res.data;
};

export const useReservationForPay = (reserveId) => {
  const {
    data: reservation,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["reservationForPay", reserveId],
    queryFn: () => fetchReservationForPay(reserveId),
  });

  console.log("Payment reserverId = " + reserveId);

  return { reservation, isLoading, isFetching, isError, error };
};

// 포인트 결제를 위한 POST 요청
const fetchReserveForCashPayment = async (reserveId) => {
  console.log(`fetchReserveForCashPayment ${reserveId}`);

  return await axios.post(`/api/v1/cashLog/payByCash/${reserveId}`);
};

export const useReserveForCashPayment = () => {
  const queryClient = useQueryClient();
  const [cashLogConfirm, setCashLogConfirm] = useState(null);
  const {
    mutate: submitReservation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (reserveId) => {
      return fetchReserveForCashPayment(reserveId);
    },
    onSuccess: (res) => {
      console.log("포인트 결제 성공");
      console.log(res);

      if (!res.data.result) {
        toast.error("포인트 결제에 실패했습니다 🥲");
        return;
      }

      toast.success("포인트 결제가 완료되었습니다!");

      setCashLogConfirm(res);

      console.log("res = " + res);

      queryClient.invalidateQueries({ queryKey: ["reserve"] });
    },
    onError: (err) => {
      console.log("포인트 결제 실패");
      console.log(err);

      toast.error("포인트 결제에 실패했습니다 🥲");

      return err;
    },
  });

  return { submitReservation, cashLogConfirm, isPending, isError, error };
};

// 예약 완료창
const fetchCashLogForConfirm = async (cashLogId) => {
  const res = await axios.get(`api/v1/cashLog/${cashLogId}/confirm`, {
    ...axios.defaults,
    useAuth: true,
  });

  console.log("fetchCashLogForConfirm");

  return res.data;
};

export const useCashLogForConfirm = (cashLogId) => {
  const {
    data: cashLog,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["cashLogForConfirm", cashLogId],
    queryFn: () => fetchCashLogForConfirm(cashLogId),
  });

  console.log("cashLogId = " + cashLogId);

  return { cashLog, isLoading, isFetching, isError, error };
};

// TossPayments post 요청
const fetchTossPayments = async ({ payment, reserveId }) => {
  console.log(reserveId);
  return await axios.post(`/api/v1/cashLog/payByToss/${reserveId}`, payment);
};

export const useTossPayments = () => {
  const queryClient = useQueryClient();
  const [response, setResponse] = useState(null);
  const {
    mutate: submitTossPayments,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ payment, reserveId }) => {
      return fetchTossPayments({ payment, reserveId });
    },
    onSuccess: (res) => {
      console.log("토스페이먼트 결제 성공");
      console.log(res);

      if (!res.data.result) {
        toast.error("토스페이먼트 결제에 실패했습니다 🥲");
        return;
      }

      setResponse(res);

      console.log(`response is`);
      console.log(res);

      toast.success("토스페이먼트 결제가 완료되었습니다!");

      queryClient.invalidateQueries({ queryKey: ["tossPayments"] });
    },
    onError: (err) => {
      console.log("토스페이먼트 결제 실패");
      console.log(err);

      toast.error("토스페이먼트 결제에 실패했습니다 🥲");

      return err;
    },
  });

  return { submitTossPayments, response, isPending, isError, error };
};

// 예약 취소
const fetchReserveForCancel = async (reserveId) => {
  console.log(`/api/v1/cashLog/${reserveId}/cancel`);
  return await axios.patch(`/api/v1/cashLog/${reserveId}/cancel`, {},
  {
    ...axios.defaults,
    useAuth: true,
  });
};

export const useReserveForCancel = () => {
  const queryClient = useQueryClient();
  const [res, setRes] = useState(null);
  const {
    mutate: submitReserveForCancel,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (reserveId) => {
      return fetchReserveForCancel(reserveId);
    },
    onSuccess: (res) => {
      console.log("예약 취소 성공");

      if (!res.data.result) {
        toast.error("예약 취소에 실패했습니다 🥲");
        return;
      }

      toast.success("예약 취소가 완료되었습니다!");

      setRes(res);

      queryClient.invalidateQueries({ queryKey: ["reserve"] });
    },
    onError: (err) => {
      console.log("예약 취소 실패");

      toast.error("예약 취소에 실패했습니다 🥲");

      return err;
    },
  });

  return { submitReserveForCancel, res, isPending, isError, error };
};