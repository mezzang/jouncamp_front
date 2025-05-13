// src/services/mypageService.js

/**
 * 내 강의실 목록을 가져오는 API 서비스 함수
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
    // JSON API 엔드포인트 호출
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

    // 응답이 JSON인지 확인
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        "서버가 JSON 응답을 반환하지 않았습니다. 백엔드 API를 확인하세요."
      );
    }

    const data = await response.json();
    return {
      orders: data.orders || [],
      totalRecords: data.totalRecords || 0,
      pageSize: data.pageSize || 10,
      currentPage: data.currentPage || page,
      searchMode: data.searchMode || false,
      searchField: data.searchField || "",
      searchQuery: data.searchQuery || "",
    };
  } catch (error) {
    console.error("강의 목록 조회 실패:", error);
    throw error;
  }
}

/**
 * 강의 상세 정보를 가져오는 API 서비스 함수
 *
 * @param {number} orderNo - 주문 번호
 * @param {number} page - 현재 페이지 번호 (페이지네이션 상태 유지용)
 * @param {string} searchField - 검색 필드 (검색 상태 유지용)
 * @param {string} searchQuery - 검색어 (검색 상태 유지용)
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
      if (response.status === 401 || response.url.includes("Member/Login")) {
        window.location.href = "/Member/Login";
        throw new Error("로그인이 필요합니다.");
      }
      if (response.status === 404) {
        throw new Error("강의를 찾을 수 없습니다.");
      }
      throw new Error(`서버 응답 오류: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        "서버가 JSON 응답을 반환하지 않았습니다. 백엔드 API를 확인하세요."
      );
    }

    const data = await response.json();
    return {
      order: data.order,
      vods: data.vods || [],
      vodHistoryList: data.vodHistoryList || [],
    };
  } catch (error) {
    console.error("강의 상세 정보 조회 실패:", error);
    throw error;
  }
}

/**
 * VOD 플레이어에 필요한 정보를 가져오는 API 서비스 함수
 *
 * @param {number} vodId - VOD 번호
 * @param {string} orderCode - 주문 코드
 * @returns {Promise<Object>} - VOD 정보
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
      if (response.status === 401 || response.url.includes("Member/Login")) {
        window.location.href = "/Member/Login";
        throw new Error("로그인이 필요합니다.");
      }
      if (response.status === 404) {
        throw new Error("VOD를 찾을 수 없습니다.");
      }
      throw new Error(`서버 응답 오류: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        "서버가 JSON 응답을 반환하지 않았습니다. 백엔드 API를 확인하세요."
      );
    }

    return await response.json();
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
 * @returns {Promise<boolean>} - 업데이트 성공 여부
 */
export async function updateAccessTime(vodId, orderCode) {
  try {
    const url = `/Mypage/VodPlayerTime/${vodId}?order_code=${encodeURIComponent(
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
      console.warn(`시청 시간 업데이트 실패: ${response.status}`);
      return false;
    }

    // JSON 응답 확인 (성공 여부)
    const data = await response.json();
    return data.success || false;
  } catch (error) {
    console.error("VOD 시청 시간 업데이트 실패:", error);
    // 에러를 무시하고 계속 재생할 수 있도록 오류를 던지지 않음
    return false;
  }
}

/**
 * VOD 현재 재생 위치 업데이트 API 서비스 함수
 * 페이지 이탈 시 호출되는 함수
 *
 * @param {number} vodId - VOD 번호
 * @param {string} orderCode - 주문 코드
 * @param {number} currentTime - 현재 재생 위치 (초)
 * @returns {Promise<boolean>} - 업데이트 성공 여부
 */
export async function updateCurrentTime(vodId, orderCode, currentTime) {
  try {
    const url = `/Mypage/VodPlayerCurrentTime/${vodId}?order_code=${encodeURIComponent(
      orderCode
    )}&ct=${currentTime}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.warn(`현재 위치 업데이트 실패: ${response.status}`);
      return false;
    }

    // JSON 응답 확인 (성공 여부)
    const data = await response.json();
    return data.success || false;
  } catch (error) {
    console.error("VOD 현재 위치 업데이트 실패:", error);
    // 에러를 무시하고 계속 재생할 수 있도록 오류를 던지지 않음
    return false;
  }
}
