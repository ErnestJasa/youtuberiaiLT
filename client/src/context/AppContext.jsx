import { createContext, useState } from "react";
import { getAllCategories, getChannels } from "../api";

export const AppContext = createContext(null);
export function AppProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState({
    search: "",
    includeCategories: [],
    excludeCategories: [],
    sortOrder: "",
  });
  const [channels, setChannels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [channelsLoading, setChannelsLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  function handleSearchInputChange(e) {
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      search: e.target.value,
    }));
  }

  function getChannelsData() {
    setChannelsLoading(true);
    getChannels(searchQuery).then((data) => {
      if (data) {
        setChannels(data);
      } else {
        setChannels(channels);
      }
      setChannelsLoading(false);
    });
  }
  function getMoreChannels(pageNumber = 1) {
    getChannels(searchQuery, pageNumber).then((data) => {
      if (data) {
        setChannels((prevChannels) => [...prevChannels, ...data]);
      }
    });
  }
  function getCategories() {
    setCategoriesLoading(true);
    getAllCategories().then((data) => {
      setCategories(data);
      setCategoriesLoading(false);
    });
  }

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        channels,
        categories,
        channelsLoading,
        categoriesLoading,
        setChannelsLoading,
        setCategories,
        setChannels,
        handleSearchInputChange,
        getChannelsData,
        getCategories,
        getMoreChannels,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
