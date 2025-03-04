// authService.js
import axios from "axios";
import { API_URLS } from "./apiUrls";

export const registerUser = async (registerData) => {
  // Sprawdzamy, czy w localStorage są już zapisane dane, jeśli tak, to je usuwamy
  if (localStorage.getItem("accessToken")) {
    localStorage.removeItem("accessToken");
    console.log("Usunięto stare dane tokenu.");
  }

  if (localStorage.getItem("login")) {
    localStorage.removeItem("login");
    console.log("Usunięto stare dane logowania.");
  }

  // Wysyłamy dane rejestracyjne do serwera
  try {
    const response = await axios.post(API_URLS.REGISTER, registerData);

    if (response.status === 200 || response.status === 201) {
      console.log("Sukces! Otrzymano kod:", response.status);
      console.log("Dane z serwera:", response.data);
      const token = response.data.token;
      localStorage.setItem("accessToken", token); // Zapisanie nowego tokenu
      localStorage.setItem("login", registerData.login); // Zapisanie nowego loginu
      console.log("Nowy token:", token);
      return{ status:response.status,success:true}
    } else {
      console.log(`Otrzymano inny kod: ${response.status}`);
      return { status: response.status, success: false };
    }
  } catch (error) {
    console.error("Błąd podczas rejestracji:", error);
  }
};


export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(API_URLS.AUTHENTICATE, loginData);
    if (response.status === 200 || response.status === 201) {
      console.log("Sukces! Otrzymano kod:", response.status);
      console.log("Dane z serwera:", response.data);
      const token = response.data.token; // Pobierz token
      localStorage.setItem("accessToken", token);
      localStorage.setItem("login", loginData.login);
      console.log(token);
      console.log("login zapisany w localStorage",loginData.login)
      return { status: response.status, success: true };
    } else {
      console.log(`Otrzymano inny kod: ${response.status}`);
      return { status: response.status, success: false };
    }
  } catch (error) {
    console.error("Błąd logowania:", error);
    return {
      status: error.response ? error.response.status : null,
      success: false,
    };
  }
};

export const apiOccupyFirstAvilable = async () => {
  try {
    // Pobierz token z localStorage
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Brak tokena w localStorage!");
      return;
    }

    // Wykonaj zapytanie PUT z nagłówkiem Authorization
    const response = await axios.put(
      API_URLS.OCCUPY_FIRST_AVILABLE,
      {}, // Pusty obiekt jako body (jeśli nie przesyłasz żadnych danych w treści)
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Token JWT z localStorage
        },
      }
    );

    if (response.status === 200) {
      console.log("Zajęto pierwsze dostępne miejsce:", response.data);
    }
  } catch (error) {
    console.error("Błąd zajęcia pierwszego dostępnego miejsca:", error);
  }
};

/*
const url=`${API_URLS.OCCUPY_SLOT}/${slotId}/occupy?reservedBy=${reservedBy}`;
*/
export const apiOccupySlot = async (slotId,reservedBy)=>{
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Brak tokena w localStorage!");
      return;
    }
    const url=`${API_URLS.OCCUPY_SLOT}/${slotId}/occupy?reservedBy=${reservedBy}`;
   
    const response = await axios.put(
      url,
      {}, 
      {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      }
    );

    if (response.status === 200) {
      console.log("Zajęto miejsce o id:", response.data);
    }
  } catch (error) {
    console.error("Nie udalo sie zajac miejsca:", error);
  }
}



export const getUserData = async (login) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Brak tokena w localStorage!");
      return null; // Zwróć null jeśli nie ma tokena
    }
    const url = `${API_URLS.USER_INFO}/${login}`;
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`, // Token JWT z localStorage
      },
    });
    return response.data; // Zwróć dane użytkownika
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUsersList = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Brak tokena w localStorage!");
      return null; // Zwróć null jeśli nie ma tokena
    }
  
    const response = await axios.get(API_URLS.GET_USERS_LIST, {
      headers: {
        'Authorization': `Bearer ${token}`, // Token JWT z localStorage
      },
    });
    return response.data; // Zwróć dane użytkownika
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deactivateUser = async (login) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Brak tokena w localStorage!");
      return null; 
    }
    
    const url = `${API_URLS.DEACTIVATE_USER}/${login}/toggleActive`;

    // Wywołanie PUT z odpowiednimi nagłówkami
    const response = await axios.put(
      url, // URL
      {}, // Jeśli nie wysyłasz danych w ciele, możesz wysłać pusty obiekt
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Dodanie tokena do nagłówka
        },
      }
    );

    return response.data; // Zwróć dane odpowiedzi
  } catch (error) {
    console.log(error); // Obsługa błędów
    return null; // Zwróć null w przypadku błędu
  }
};
export const getAllFreeSlots = async () => {
  try {
    // Pobierz token z localStorage
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Brak tokena w localStorage!");
      return;
    }

    // Wykonaj zapytanie GET z nagłówkiem Authorization
    const response = await axios.get(API_URLS.ALL_AVILABLE_SLOTS, {
      headers: {
        'Authorization': `Bearer ${token}`, // Token JWT z localStorage
      },
    });

    if (response.status === 200) {
      console.log("Wolne miejsca parkingowe:", response.data);
      const freeSlotsCount = response.data.length;
      return response.data; // Zwróć dane o wolnych miejscach
    } else {
      console.error(`Otrzymano nieoczekiwany status: ${response.status}`);
    }
  } catch (error) {
    console.error("Błąd pobierania wolnych miejsc parkingowych:", error);
  }
};

export const allBusySlots = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Brak tokena w localStorage!");
      return null; // Zwróć null jeśli nie ma tokena
    }

    const response = await axios.get(API_URLS.ALL_BUSY_SLOTS, {
      headers: {
        'Authorization': `Bearer ${token}`, // Dodanie tokena do nagłówka
      },
    });

    // Sprawdź, czy odpowiedź zawiera dane
    if (response && response.data) {
      console.log(response.data);  // Tylko dla debugowania
      const busySlotsCount = response.data.length;
      return response.data;  // Zwróć dane
    } else {
      console.error("Brak danych w odpowiedzi!");
      return null;
    }
  
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
    return null;
  }
};

export const releaseSlot = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Brak tokena w localStorage!");
      return null; // Zwróć null, jeśli nie ma tokena
    }

    const response = await axios.put(
      API_URLS.RELEASE, 
      {}, // Pusty obiekt jako ciało PUT, jeśli nie wysyłasz żadnych danych
      {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      }
    );

    return response.data; // Zwracamy dane odpowiedzi
  } catch (error) {
    console.error("Błąd podczas zwalniania miejsca parkingowego:", error);
    return null; // Zwróć null w przypadku błędu
  }
};

export const getUserSlot = async (login) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Brak tokena w localStorage!");
      return null; // Zwróć null, jeśli nie ma tokena
    }

    const url = `${API_URLS.GET_USER_SLOT}/${login}`;
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });

    return response.data; // Zwracamy dane odpowiedzi
  } catch (error) {
    console.error("Błąd podczas pobierania danych użytkownika:", error);
    return null; // Zwróć null w przypadku błędu
  }
};

export const slotState = async () => {
  try {
    const response = await axios.get(API_URLS.SLOT_STATE);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Nieprawidłowy status odpowiedzi: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Błąd podczas pobierania danych o miejscach parkingowych:", error);
    return null;
  }
};
