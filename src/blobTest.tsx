import React from "react";
import { JSX, useState } from "react";
import { cssNumber } from "jquery";

export type seirekiNameType = "西暦" | number;
export type monthNameType = "月" | number
export type dayNameType = "日" | number;
export type seirekiType = { seireki: seirekiNameType, state: boolean | undefined }
export type monthType = { month: monthNameType, state: boolean | undefined }
export type dayType = { day: dayNameType, state: boolean | undefined }

const seirekiArr = (): seirekiType[] => {
  const arr: seirekiType[] = [];
  arr.push({
    seireki: "西暦",
    state: undefined,
  });
  for (let i = 2025; i >= 1970; i--) {
    arr.push({ seireki: i, state: false });
  }
  return arr;
};
const monthArr = (): monthType[] => {
  const arr: monthType[] = [];
  arr.push({
    month: "月",
    state: undefined,
  });
  for (let i = 1; i <= 12; i++) {
    arr.push({ month: i, state: false });
  }
  return arr;
};

const monthSelect = (month: React.ChangeEvent<HTMLSelectElement>) => {
  const selectMonth = document.getElementById("month") as HTMLSelectElement;
  const selectYear = document.getElementById("seireki") as HTMLSelectElement;
  const selectDay = document.getElementById("day") as HTMLSelectElement;
  const children = selectDay.children;
  while (children.length) {
    children[0].remove();
  }
  if (selectMonth.value !== "" && selectYear.value !== "") {
    const lastDay = new Date(Number(selectYear.value), Number(selectMonth.value), 0).getDate();
    for (let i = 0; i < lastDay; i++) {
      let optionTag = document.createElement("option");
      optionTag.value = i.toString();
      optionTag.text = i.toString();
      selectDay.appendChild(optionTag);
    }
  }
};


const dayArr = (): Array<dayType> => {
  const arr: dayType[] = [];
  arr.push({
    day: "日",
    state: undefined,
  });
  return arr;
};
const BlobTest = (): JSX.Element => {
  const [getName, setName] = useState("");
  const inputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const decision = () => {
    return new Promise<void>((resolve, reject) => {
      const getSeireki = document.getElementById("seireki") as HTMLSelectElement;
      const getMonth = document.getElementById("month") as HTMLSelectElement;
      const getDay = document.getElementById("day") as HTMLSelectElement;
      const dataList = {
        seireki: getSeireki.value,
        month: getMonth.value,
        day: getDay.value,
        name: getName,
      };
      try {
        const exchangeStr = JSON.stringify(dataList, null, 2);
        const createFile = new Blob([exchangeStr], { type: "text/plain" });
        const createUrl = URL.createObjectURL(createFile);
        const getTag = document.createElement("a");
        getTag.download = "生年月日.json";
        getTag.href = createUrl;
        getTag.click();
        getTag.remove();
        // 使い終わったurlは削除
        URL.revokeObjectURL(createUrl);
      } catch (e) {
        reject("JSON変換処理に失敗しました");
      }
    });
  };
  return (
    <div
      style={{ marginTop: "-500px", height: 18 }}
    >
      <select
        id="seireki"
      >
        {seirekiArr().map((value) => {
          return <option key={value.seireki}>{value.seireki}</option>;
        })
        }
      </select>

      <select
        id="month"
        onChange={(value) => monthSelect(value)}
      >
        {monthArr().map((value) => {
          return <option key={value.month}>{value.month}</option>;
        })
        }
      </select>

      <select
        id="day"
      >
        {dayArr().map((value) => {
          return <option key={value.day}>{value.day}</option>;
        })
        }
      </select>

      <input
        style={{ height: 13 }}
        onChange={(e) => inputName(e)}
      ></input>
      <button
        style={{ position: "relative", top: 0, height: 19.5, lineHeight: 0 }}
        onClick={decision}
      >決定
      </button>
    </div>
  );
};
export { BlobTest };

