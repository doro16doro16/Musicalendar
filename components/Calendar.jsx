import React, { useEffect, useState } from "react";
import * as dayjs from "dayjs";
import styles from "../styles/Home.module.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { createAsyncThunk } from "@reduxjs/toolkit";

function Calendar() {
  const typeMap = [
    "fire",
    "water",
    "grass",
    "fighting",
    "flying",
    "fairy",
    "poison",
    "dragon",
    "steel",
    "electric",
    "ground",
    "rock",
  ];
  const [date, setDate] = useState(dayjs());
  const [daysArr, setDaysArr] = useState([]);
  const [pokemonArr, setPokemonArr] = useState([]);
  const [typeArr, setTypeArr] = useState([]);
  const [currentType, setCurrentType] = useState(null);

  useEffect(() => {
    // 893 pokemon
    async function sendRequest() {
      const promises = new Array(750)
        .fill()
        .map(
          async (v, i) =>
            await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
        );
      var resolved = await Promise.all(promises);
      var data = await Promise.all(resolved.map((res) => res.json()));
      setPokemonArr(data);
    }
    sendRequest();
    return () => {};
  }, []);

  useEffect(() => {
    createCalendar(date);
  }, [date]);

  const appendPokemon = (daysArr) => {
    if (!daysArr) return;
    const filteredState = filterArr(typeMap[date.month()]);
    setTypeArr(filteredState);
    let newDays = daysArr.map((day, i) => {
      if (day) {
        return { day: day.date(), ...filteredState[i] };
      }
      return day;
    });
    return newDays;
  };

  const createCalendar = (month) => {
    let firstDay = dayjs(month).startOf("M");
    setCurrentType(typeMap[date.month()]);

    let days = Array.apply(null, { length: month.daysInMonth() }) // 이번 달의 일 수 가져오기
      .map(Number.call, Number)
      .map((n) => {
        return dayjs(firstDay).add(n, "d");
      });

    for (let n = 0; n < firstDay.day(); n++) {
      days.unshift(null);
    }

    days = appendPokemon(days);
    setDaysArr(days);
  };

  const filterArr = (type) => {
    var typePokemonArr = pokemonArr.filter((poke) => {
      let types = poke.types.map(({ type }) => type.name);
      return ~types.indexOf(type);
    });
    var types = typePokemonArr.map(
      ({ sprites: { front_default: sprite }, name }) => {
        return { sprite, name };
      }
    );
    return types;
  };

  const previousMonth = () => {
    const newMonth = date.subtract(1, "M");
    setDate(newMonth);
    setCurrentType(typeMap[newMonth.month()]);
  };

  const nextMonth = () => {
    const newMonth = date.add(1, "M");
    setDate(newMonth);
    setCurrentType(typeMap[newMonth.month()]);
  };

  return (
    <section className={styles.calendar}>
      <div className={styles.calendar__month}>
        <div className={styles.circle__empty}>
          <BsChevronLeft onClick={previousMonth} />
        </div>
        <p>
          {date.format("MMMM ")} {date.format("YYYY ")}
        </p>
        <div className={styles.circle__empty}>
          <BsChevronRight onClick={nextMonth} />
        </div>
      </div>
      <div className={styles.calendar__week}>
        <div>SUN</div>
        <div>MON</div>
        <div>TUE</div>
        <div>WED</div>
        <div>THU</div>
        <div>FRI</div>
        <div>SAT</div>
      </div>
      <div className={styles.calendar__days}>
        {daysArr &&
          daysArr.map((v, i) => {
            return (
              <div key={i}>
                {v && (
                  <>
                    <div className={styles.date__day}>{v.sprite && v.day}</div>
                    {v.sprite && (
                      <img
                        className={styles.small__img}
                        alt="pokemon sprite"
                        src={v.sprite}
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default Calendar;
