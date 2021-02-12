import { useState, useEffect } from "react";

export const useContacts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      // console.log(page);
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://randomuser.me/api/?results=200" &&
            "https://randomuser.me/api/?page=3&results=10&seed=abc"
        );
        const { results, error } = await response.json();
        setData(results);
        console.log(results);

        if (error) {
          throw new Error(error);
        }
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getContacts();
  }, []);
  return {
    data,
    isLoading,
    isError,
  };
};
