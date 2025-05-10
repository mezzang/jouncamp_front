// src/services/mypageService.js

/**
 * 내 강의실 목록을 가져오는 API 서비스 함수
 * 기존 ASP.NET MVC 컨트롤러와 연동
 *
 * @param {number} page - 현재 페이지 번호
 * @param {string} searchField - 검색 필드
 * @param {string} searchQuery - 검색어
 * @returns {Promise<Object>} - 강의 목록, 총 레코드 수 등을 포함한 객체
 */
export async function getMyCourses(
  page = 1,
  searchField = "",
  searchQuery = ""
) {
  try {
    // HTML 페이지 요청 (Accept 헤더를 application/json으로 설정하여 JSON 응답 요청)
    const url = `/Mypage/Index?Page=${page}&SearchField=${encodeURIComponent(
      searchField
    )}&SearchQuery=${encodeURIComponent(searchQuery)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include", // 쿠키 포함 (인증 세션 유지)
    });

    if (!response.ok) {
      // 인증 필요 시 로그인 페이지로 리다이렉트
      if (response.status === 401 || response.url.includes("Member/Login")) {
        window.location.href = "/Member/Login";
        throw new Error("로그인이 필요합니다.");
      }
      throw new Error(`서버 응답 오류: ${response.status}`);
    }

    // 응답이 JSON인 경우 (컨트롤러가 Accept 헤더를 처리하는 경우)
    if (response.headers.get("content-type")?.includes("application/json")) {
      const data = await response.json();
      return {
        orders: data.orders || [],
        totalRecords: data.totalRecords || 0,
        pageSize: data.pageSize || 10,
        currentPage: page,
      };
    }

    // 응답이 HTML인 경우 (직접 파싱 필요)
    // 참고: 실제 구현에서는 서버 측에서 JSON 응답을 반환하도록 수정하는 것이 좋음
    console.warn(
      "서버가 HTML을 반환했습니다. JSON API로 수정하는 것을 권장합니다."
    );
    const html = await response.text();

    // HTML 파싱을 위해 임시 DOM 생성
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // 강의 목록 테이블에서 데이터 추출 (선택자는 실제 HTML 구조에 맞게 조정 필요)
    const rows = Array.from(doc.querySelectorAll("table.table tbody tr"));
    const orders = rows.map((row) => {
      const cells = row.querySelectorAll("td");
      // 필드 매핑은 실제 HTML 구조에 맞게 조정 필요
      return {
        No: parseInt(row.getAttribute("data-id") || "0"),
        Lec_name: cells[1]?.textContent?.trim() || "",
        Lec_start: cells[2]?.textContent?.split("~")[0]?.trim() || "",
        Lec_end: cells[2]?.textContent?.split("~")[1]?.trim() || "",
        Price: parseInt(cells[3]?.textContent?.replace(/[^\d]/g, "") || "0"),
      };
    });

    // 페이징 정보 추출
    const totalRecordEl = doc.querySelector("[data-total-record]");
    const totalRecords = totalRecordEl
      ? parseInt(totalRecordEl.getAttribute("data-total-record") || "0")
      : 0;

    return {
      orders,
      totalRecords,
      pageSize: 10,
      currentPage: page,
    };
  } catch (error) {
    console.error("강의 목록 조회 실패:", error);
    throw error;
  }
}

/**
 * 강의 상세 정보를 가져오는 API 서비스 함수
 * 기존 ASP.NET MVC 컨트롤러와 연동
 *
 * @param {number} orderNo - 주문 번호
 * @param {number} page - 현재 페이지 번호
 * @param {string} searchField - 검색 필드
 * @param {string} searchQuery - 검색어
 * @returns {Promise<Object>} - 강의 상세 정보
 */
export async function getMyLectureDetail(
  orderNo,
  page = 1,
  searchField = "",
  searchQuery = ""
) {
  try {
    const url = `/Mypage/Detail/${orderNo}?Page=${page}&SearchField=${encodeURIComponent(
      searchField
    )}&SearchQuery=${encodeURIComponent(searchQuery)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      // 인증 필요 시 로그인 페이지로 리다이렉트
      if (response.status === 401 || response.url.includes("Member/Login")) {
        window.location.href = "/Member/Login";
        throw new Error("로그인이 필요합니다.");
      }
      throw new Error(`서버 응답 오류: ${response.status}`);
    }

    // 응답이 JSON인 경우 (컨트롤러가 Accept 헤더를 처리하는 경우)
    if (response.headers.get("content-type")?.includes("application/json")) {
      const data = await response.json();
      return {
        order: data.order,
        vods: data.vods || [],
        vodHistoryList: data.vodHistoryList || [],
      };
    }

    // 응답이 HTML인 경우 (직접 파싱 필요)
    // 참고: 실제 구현에서는 서버 측에서 JSON 응답을 반환하도록 수정하는 것이 좋음
    console.warn(
      "서버가 HTML을 반환했습니다. JSON API로 수정하는 것을 권장합니다."
    );
    const html = await response.text();

    // HTML 파싱을 위한 임시 DOM 생성
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // 강의 정보 추출 (선택자는 실제 HTML 구조에 맞게 조정 필요)
    const lecNameEl = doc.querySelector(".navbar-brand");
    const lecName = lecNameEl?.textContent?.replace(/\(.*\)/g, "").trim() || "";
    const lecPeriod = lecNameEl?.textContent?.match(/\((.*?)\)/)?.[1] || "";
    const lecStart = lecPeriod.split("~")[0]?.trim() || "";
    const lecEnd = lecPeriod.split("~")[1]?.trim() || "";

    // VOD 목록 추출
    const rows = Array.from(doc.querySelectorAll("table.table tbody tr"));
    const vods = rows.map((row) => {
      const cells = row.querySelectorAll("td");
      // 필드 매핑은 실제 HTML 구조에 맞게 조정 필요
      return {
        No: parseInt(row.getAttribute("data-id") || "0"),
        Vod_num: cells[0]?.textContent?.split("\n")[0]?.trim() || "",
        Num_str: cells[0]?.querySelector("span")?.textContent?.trim() || "",
        Vod_title: cells[1]?.querySelector("a")?.textContent?.trim() || "",
        Vod_str: cells[1]?.querySelector("span")?.textContent?.trim() || "",
        Vod_file: cells[2]?.innerHTML?.includes("View") ? "video.mp4" : "",
        Youtube:
          cells[2]?.querySelector('a[href*="youtube"]')?.getAttribute("href") ||
          "",
        Youtube_live:
          cells[2]?.querySelector('a[style*="FF6666"]')?.getAttribute("href") ||
          "",
        Zoom:
          cells[2]?.querySelector('a[style*="5487ad"]')?.getAttribute("href") ||
          "",
        Vod_book: cells[3]?.querySelector("a")?.textContent ? "book.pdf" : "",
        Vod_time: parseInt(cells[5]?.textContent?.replace(/[^\d]/g, "") || "0"),
      };
    });

    // 추출된 정보를 원본 ASP.NET 모델 구조에 맞게 구성
    const order = {
      No: orderNo,
      Lec_name: lecName,
      Lec_start: lecStart,
      Lec_end: lecEnd,
      JcLecture: {
        Media_server: "",
        Media_root: "",
        Media_folder: "",
        Book_folder: "",
        Vods: vods,
      },
    };

    // VOD 기록 정보 추출 (실제 구현에서는 ViewBag.VodHistoryList에서 가져오는 방식이 필요)
    const vodHistoryList = rows.map((row) => {
      const cells = row.querySelectorAll("td");
      const vodNo = parseInt(row.getAttribute("data-id") || "0");
      const viewRate = parseInt(
        cells[4]?.textContent?.replace(/[^\d]/g, "") || "0"
      );
      const vodTime = parseInt(
        cells[5]?.textContent?.replace(/[^\d]/g, "") || "0"
      );
      // 역산하여 Stay_time 추정
      const stayTime = Math.floor((viewRate / 100) * vodTime * 60);

      return {
        Vod_no: vodNo,
        Stay_time: stayTime,
        Current_time: 0, // 기본값 (실제 값은 서버에서만 알 수 있음)
      };
    });

    return {
      order,
      vods,
      vodHistoryList,
    };
  } catch (error) {
    console.error("강의 상세 정보 조회 실패:", error);
    throw error;
  }
}

/**
 * VOD 플레이어에 필요한 정보를 가져오는 API 서비스 함수
 * 기존 ASP.NET MVC 컨트롤러와 연동
 *
 * @param {number} vodId - VOD 번호
 * @param {string} orderCode - 주문 코드
 * @returns {Promise<Object>} - VOD 정보, 주문 정보, 시청 기록 등을 포함한 객체
 */
export async function getVodInfo(vodId, orderCode) {
  try {
    const url = `/Mypage/VodPlayer/${vodId}?order_code=${encodeURIComponent(
      orderCode
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      // 인증 필요 시 로그인 페이지로 리다이렉트
      if (response.status === 401 || response.url.includes("Member/Login")) {
        window.location.href = "/Member/Login";
        throw new Error("로그인이 필요합니다.");
      }
      throw new Error(`서버 응답 오류: ${response.status}`);
    }

    // 응답이 JSON인 경우 (컨트롤러가 Accept 헤더를 처리하는 경우)
    if (response.headers.get("content-type")?.includes("application/json")) {
      const data = await response.json();
      return data;
    }

    // 응답이 HTML인 경우 (직접 파싱 필요)
    // 참고: 실제 구현에서는 서버 측에서 JSON 응답을 반환하도록 수정하는 것이 좋음
    console.warn(
      "서버가 HTML을 반환했습니다. JSON API로 수정하는 것을 권장합니다."
    );
    const html = await response.text();

    // HTML 파싱을 위한 임시 DOM 생성
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // VOD 정보 추출
    const vodTitle = doc.querySelector("title")?.textContent || "";
    const videoSrc =
      doc.querySelector("video source")?.getAttribute("src") || "";

    // 히든 필드에서 정보 추출
    const orderCodeInput =
      doc.querySelector('input[name="order_code"]')?.value || "";
    const vodNoInput = doc.querySelector('input[name="vod_no"]')?.value || "";

    // 자바스크립트 코드에서 정보 추출
    const scripts = Array.from(doc.querySelectorAll("script"))
      .map((s) => s.textContent)
      .join("\n");
    const currentTimeMatch = scripts.match(
      /currentState\s*=\s*[\"\'](Y|N)[\"\']/
    );
    const currentTimeValueMatch = scripts.match(
      /seek\s*\(\s*[\"\'](\d+)[\"\']\s*\)/
    );

    // 미디어 URL에서 서버/폴더 정보 추출
    const mediaParts = videoSrc.split("/");
    const mediaServer = mediaParts.slice(0, 3).join("/");
    const mediaFolder = mediaParts.slice(3, -1).join("/");

    // 추출된 정보를 원본 ASP.NET 모델 구조에 맞게 구성
    const vod = {
      No: parseInt(vodNoInput),
      Vod_title: vodTitle,
      Vod_file: videoSrc.split("/").pop() || "",
    };

    const order = {
      Order_code: orderCodeInput,
    };

    const vodHistory =
      currentTimeMatch && currentTimeMatch[1] === "Y"
        ? {
            Current_time: parseInt(currentTimeValueMatch?.[1] || "0"),
          }
        : null;

    return {
      vod,
      order,
      vodHistory,
      media_server: mediaServer,
      media_root: "",
      media_folder: mediaFolder,
      book_folder: "",
    };
  } catch (error) {
    console.error("VOD 정보 조회 실패:", error);
    throw error;
  }
}

/**
 * VOD 시청 시간 업데이트 API 서비스 함수
 * 30초마다 호출되는 함수
 *
 * @param {number} vodId - VOD 번호
 * @param {string} orderCode - 주문 코드
 * @returns {Promise<void>} - 업데이트 결과
 */
export async function updateAccessTime(vodId, orderCode) {
  try {
    const url = `/Mypage/VodPlayerTime/${vodId}?order_code=${encodeURIComponent(
      orderCode
    )}`;

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.warn(`시청 시간 업데이트 실패: ${response.status}`);
    }

    return;
  } catch (error) {
    console.error("VOD 시청 시간 업데이트 실패:", error);
    // 에러를 무시하고 계속 재생할 수 있도록 오류를 던지지 않음
    return;
  }
}

/**
 * VOD 현재 재생 위치 업데이트 API 서비스 함수
 * 페이지 이탈 시 호출되는 함수
 *
 * @param {number} vodId - VOD 번호
 * @param {string} orderCode - 주문 코드
 * @param {number} currentTime - 현재 재생 위치 (초)
 * @returns {Promise<void>} - 업데이트 결과
 */
export async function updateCurrentTime(vodId, orderCode, currentTime) {
  try {
    const url = `/Mypage/VodPlayerCurrentTime/${vodId}?order_code=${encodeURIComponent(
      orderCode
    )}&ct=${currentTime}`;

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.warn(`현재 위치 업데이트 실패: ${response.status}`);
    }

    return;
  } catch (error) {
    console.error("VOD 현재 위치 업데이트 실패:", error);
    // 에러를 무시하고 계속 재생할 수 있도록 오류를 던지지 않음
    return;
  }
}
