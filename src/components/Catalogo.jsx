import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getAllAds, getPremiumAds } from "../services/annunciNoleggio";
import { getValutazioniOggettoByAnnuncioId } from "../services/valutazioneOggetto";
import { getNoleggiByAnnuncioId } from "../services/noleggi";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StarIcon from "@mui/icons-material/Star";
import "../style/Catalogo.css";

const Catalogo = () => {
  const [premiumAds, setPremiumAds] = useState([]);
  const [allAds, setAllAds] = useState([]);
  const [isCategoriaOpen, setIsCategoriaOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const categories = [
    "Elettronica",
    "Libri",
    "Elettrodomestici",
    "Giardino e giardinaggio",
    "Arte e musica",
    "Casa e cucina",
    "Auto e moto",
    "Oggettistica professionale",
    "Sport",
  ];

  const orderOptions = [
    "Default",
    "Prezzo crescente",
    "Prezzo decrescente",
    "Nome A-Z",
    "Nome Z-A",
  ];

  useEffect(() => {
    const fetchPremiumAds = async () => {
      const premiumData = await getPremiumAds();
      setPremiumAds(premiumData);
    };

    const fetchAllAds = async () => {
      const allData = await getAllAds();
      setAllAds(allData);
    };

    fetchPremiumAds();
    fetchAllAds();
  }, []);

  const catalogItems = [
    ...premiumAds,
    ...allAds.filter(
      (ad) => !premiumAds.some((premiumAd) => premiumAd.id === ad.id)
    ),
  ];

  const handleCategoria = () => {
    isCategoriaOpen ? setIsCategoriaOpen(false) : setIsCategoriaOpen(true);
  };

  const handleRating = () => {
    isRatingOpen ? setIsRatingOpen(false) : setIsRatingOpen(true);
  };

  const handleDate = () => {
    isDateOpen ? setIsDateOpen(false) : setIsDateOpen(true);
  };

  const handleOrder = () => {
    isOrderOpen ? setIsOrderOpen(false) : setIsOrderOpen(true);
  };

  const handleCategoriesChange = (itemName) => {
    if (selectedCategories.includes(itemName)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== itemName)
      );
    } else {
      setSelectedCategories([...selectedCategories, itemName]);
    }
  };

  const Categoriabox = isCategoriaOpen ? (
    <div className="CheckboxContainer">
      <button onClick={handleCategoria}>
        Categoria
        <KeyboardArrowDownIcon />
      </button>
      <div
        style={{
          //riportare in CSS
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {categories.map((item) => (
          <div key={item}>
            <input
              type="checkbox"
              id={item}
              checked={selectedCategories.includes(item)}
              onChange={() => handleCategoriesChange(item)}
            />
            <label>{item}</label>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="CheckboxContainer">
      <button onClick={handleCategoria}>
        Categoria
        <KeyboardArrowRightIcon />
      </button>
    </div>
  );

  const isCategorySelected = (ad) => {
    return (
      selectedCategories.length === 0 ||
      selectedCategories.includes(ad.categoria)
    );
  };

  const handleRatingChange = (number) => {
    if (selectedRating.includes(number)) {
      setSelectedRating(selectedRating.filter((n) => n !== number));
    } else {
      setSelectedRating([...selectedRating, number]);
    }
  };

  const Ratingbox = isRatingOpen ? (
    <div className="CheckboxContainer">
      <button onClick={handleRating}>
        Rating
        <KeyboardArrowDownIcon />
      </button>
      <div
        style={{
          //riportare in CSS
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div>
          <input
            type="checkbox"
            id={4}
            checked={selectedRating.includes(8)}
            onChange={() => handleRatingChange(8)}
          />
          <label>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />e più
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id={3}
            checked={selectedRating.includes(6)}
            onChange={() => handleRatingChange(6)}
          />
          <label>
            <StarIcon />
            <StarIcon />
            <StarIcon />e più
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id={2}
            checked={selectedRating.includes(4)}
            onChange={() => handleRatingChange(4)}
          />
          <label>
            <StarIcon />
            <StarIcon />e più
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id={1}
            checked={selectedRating.includes(2)}
            onChange={() => handleRatingChange(2)}
          />
          <label>
            <StarIcon />e più
          </label>
        </div>
      </div>
    </div>
  ) : (
    <div className="CheckboxContainer">
      <button onClick={handleRating}>
        Rating
        <KeyboardArrowRightIcon />
      </button>
    </div>
  );

  const isRatingSelected = (ad) => {
    const adRatings = getValutazioniOggettoByAnnuncioId(ad.id);

    if (adRatings.length === 0) {
      return false;
    }

    if (selectedRating.length === 0) {
      return true;
    }

    const averageRating =
      adRatings.reduce((sum, rating) => sum + rating.voto, 0) /
      adRatings.length;

    return (
      selectedRating.reduce((min, rating) => (min <= rating ? min : rating)) <=
      averageRating
    );
  };

  const handleOrderChange = (orderOptions) => {
    setSelectedOrder(orderOptions);
  };

  const Orderbox = isOrderOpen ? (
    <div>
      <button onClick={handleOrder}>
        Ordina
        <KeyboardArrowDownIcon />
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {orderOptions.map((option) => (
          <div key={option}>
            <input
              type="radio"
              id={option}
              checked={selectedOrder === option}
              onChange={() => handleOrderChange(option)}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>
      <button onClick={handleOrder}>
        Ordina
        <KeyboardArrowRightIcon />
      </button>
    </div>
  );

  const orderedCatalogItems = () => {
    switch (selectedOrder) {
      case "Default":
        return [...catalogItems].sort((a, b) =>
          getPremiumAds().includes(a) && !getPremiumAds().includes(b)
            ? -1
            : !getPremiumAds().includes(a) && getPremiumAds().includes(b)
            ? 1
            : a.id - b.id
        );
      case "Prezzo crescente":
        return [...catalogItems].sort((a, b) => a.prezzo - b.prezzo);
      case "Prezzo decrescente":
        return [...catalogItems].sort((a, b) => b.prezzo - a.prezzo);
      case "Nome A-Z":
        return [...catalogItems].sort((a, b) =>
          a.titolo.localeCompare(b.titolo)
        );
      case "Nome Z-A":
        return [...catalogItems].sort((a, b) =>
          b.titolo.localeCompare(a.titolo)
        );
      default:
        return catalogItems;
    }
  };

  const Datebox = isDateOpen ? (
    <div>
      <button onClick={handleDate}>
        Date
        <KeyboardArrowDownIcon />
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Data Inizio"
              value={start}
              onChange={(newValue) => setStart(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Data Fine"
              value={end}
              onChange={(newValue) => setEnd(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
  ) : (
    <div>
      <button onClick={handleDate}>
        Date
        <KeyboardArrowRightIcon />
      </button>
    </div>
  );

  const isDateSelected = (ad) => {
    const adDate = getNoleggiByAnnuncioId(ad.id);

    if (adDate.length === 0 || (start === null && end === null)) {
      return true;
    }

    if (
      adDate.some(
        (noleggio) =>
          (dayjs(start).isAfter(dayjs(noleggio.dataInizio), "day") &&
            dayjs(start).isBefore(dayjs(noleggio.dataFine), "day")) ||
          (dayjs(end).isAfter(dayjs(noleggio.dataInizio), "day") &&
            dayjs(end).isBefore(dayjs(noleggio.dataFine), "day")) ||
          (dayjs(start).isBefore(dayjs(noleggio.dataInizio), "day") &&
            dayjs(end).isAfter(dayjs(noleggio.dataInizio), "day"))
      )
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="Page">
      <Navbar />
      <div
        style={{ display: "flex", flexDirection: "row" }} //va nei CSS
        className="orizontal"
      >
        <div className="cercaFiltra">
          <div className="Ricerca">
            <input type="text" placeholder="Cerca un articolo" />
            <button>Cerca</button>
          </div>
          <div className="Filtra">
            {Categoriabox}
            {Datebox}
            {Ratingbox}
            {Orderbox}
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }} // va nei CSS
          className="listaAnnunciCatalogo"
        >
          {orderedCatalogItems().map((ad) => (
            <Link to={`/dettagli/${ad.id}`} key={ad.id}>
              <div
                className={`card ${isCategorySelected(ad) ? "" : "inactive"} ${
                  isRatingSelected(ad) ? "" : "inactive"
                } ${isDateSelected(ad) ? "" : "inactive"}`}
              >
                <img src={ad.immagine} alt="Immgagine annuncio" />
                <div className="card-description">
                  <p>{ad.titolo}</p>
                  <h6>€ {ad.prezzo}/giorno</h6>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalogo;
