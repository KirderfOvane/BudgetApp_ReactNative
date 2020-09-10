import React, { useReducer } from 'react';
import axios from 'axios';
import trackerApi from '../../api/tracker';
import PresetContext from './presetContext';
import presetReducer from './presetReducer';
import {
  ADD_PRESET,
  DELETE_PRESET,
  PRE_FILTER,
  EDIT_PRESET,
  CANCEL_EDIT,
  SEND_EDIT,
  SUM,
  MONTHSUM,
  CONTACT_ERROR,
  CLEAR_PRESETS,
  GET_PRESETS,
  ADD_MONTH,
  FILTER_PRESETS,
  CLEAR_FILTER,
  FILTER_POSNUMANDMONTH,
  FILTER_NEGNUMANDMONTH,
  POSMONTHSUM,
  NEGMONTHSUM,
  CATEGORYMONTHSUM,
  RESET_SUMS,
  SET_YEAR,
  CATEGORYYEARSUM,
  YEARSUM,
  CALCSAVINGS,
  CALCCAPITAL,
  SET_PURCHASE,
  CATEGORYSUMONLYBYYEAR,
  CATEGORY_NAMEONLY_BYYEAR,
  CATEGORY_NAMEONLYPOSNUM_BYYEAR,
  CATEGORY_SUMONLYPOSNUM_BYYEAR,
  CATEGORY_SUMONLYNEGNUM_BYYEAR,
  CATEGORY_NAMEONLYNEGNUM_BYYEAR,
  SET_ALLMONTHSUM,
  RESET_ALLMONTHSUM,
  ADDTO_PIGGYBANK,
  SET_ACTIVE_PIGGYBANK,
  CLEAR_PIGGYBANKS,
  CALC_MONTH_SAVINGS,
  GET_MONTHSAVINGS,
  GET_MONTHPIGGYSAVINGS,
  DELETE_PIGGYBANK,
  SUM_PIGGYBANKS_MONTH,
  CALC_MONTH_BALANCE,
  UPLOAD_CSV,
  UPDATE_CSV,
  SUBMIT_CSV,
  CLEAR_CSV,
  REMOVE_CSV,
  SET_MONTH_PIGGYSAVINGS,
} from '../types';

const PresetState = (props) => {
  const initialState = {
    calculating: true,
    presets: null,
    sum: null,
    edit: null,
    error: null,
    month: null, // year implemented. Only indirect affects
    filtered: null, // not used atm
    MonthSum: null, // year implemented
    AllMonthSum: [], // year implemented
    PosMonthSum: null, // gets data from filteredmonthandnegnum
    NegMonthSum: null, // gets data from filteredmonthandposnum
    filteredmonthandposnum: null, // year implemented
    filteredmonthandnegnum: null, // year implemented
    categorymonthsum: [], // year implemented
    categoryyearsum: [], // year implemented
    year: '2019', // year implemented. needs more strict control of datatype. it changes between string and number
    yearsum: null, // year implemented
    savings: null, // year not used
    capital: null, // year not used
    categorysumonlybyyear: null, // year implemented  but NOT used atm.
    categorynameonlybyyear: null, // year implemented  but NOT used atm.
    categorynameonlyposnumbyyear: null, // year implemented
    categorynameonlynegnumbyyear: null, // year implemented
    categorysumonlyposnumbyyear: null, // year implemented
    categorysumonlynegnumbyyear: null, // year implemented
    piggybanks: [], // year implemented
    monthsavings: null, // year implemented
    monthsavingspresets: null, // year implemented
    monthpiggysavings: null, // year implemented no legacy
    SumPiggybanksMonth: 0, // year implemented
    MonthBalance: null, // year implemented
    purchases: null, // year independent
    csvpresets: null, // used to store values from csv-file in stagingarea
    doSubmitCsv: '',
    prefilter: [],
    MonthPiggySavingsSums: null,
  };

  const [state, dispatch] = useReducer(presetReducer, initialState);

  // Get Presets
  const getPresets = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': axios.defaults.headers.common['x-auth-token'], //TODO: this only needs to be specified cause of trackerApi.
      },
    };
    try {
      const res = await trackerApi.get('/api/userpreset', config);
      dispatch({ type: GET_PRESETS, payload: res.data });
    } catch (err) {
      console.log('getPresets failed');
      console.log(err);
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add preset
  const addPreset = async (preset) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': axios.defaults.headers.common['x-auth-token'],
      },
    };

    try {
      const res = await trackerApi.post('/api/userpreset', preset, config);
      dispatch({ type: ADD_PRESET, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete preset
  const deletePreset = async (id) => {
    try {
      await trackerApi.delete(`/api/userpreset/${id}`);
      dispatch({
        type: DELETE_PRESET,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
  // send edit aka updatePreset
  const sendEdit = async (preset) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': axios.defaults.headers.common['x-auth-token'],
      },
    };

    try {
      const res = await trackerApi.put(`/api/userpreset/${preset._id}`, preset, config);
      dispatch({ type: SEND_EDIT, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
    //Recalc ALL
    /*  resetSums();
    preset.type !== 'purchase' && calcSum(preset._id, preset.number, 'edit');
    filterOutPositiveNumsAndMonth(state.month);
    filterOutNegativeNumsAndMonth(state.month); */
  };

  // Upload CSV
  const uploadCSV = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const res = await axios.post('/api/userpreset/upload', formData, config);

      dispatch({ type: UPLOAD_CSV, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data,
      });
    }
  };

  //Update CSV
  const updateCsvPresets = (preset) => {
    //console.log('updatecsv');
    dispatch({ type: UPDATE_CSV, payload: preset });
  };

  //Remove CSV
  const removeCSV = (preset) => {
    dispatch({ type: REMOVE_CSV, payload: preset });
  };

  // Clear CSV
  const clearCsv = () => {
    dispatch({ type: CLEAR_CSV });
  };
  // Add month-val coming from Datemenu
  const addMonth = (month) => {
    dispatch({ type: ADD_MONTH, payload: month });
  };

  // set year when yearbutton is pressed in datemenucomponent
  const setYear = (year) => {
    dispatch({ type: SET_YEAR, payload: year });
  };

  // Clear presets
  const clearPresets = () => {
    dispatch({ type: CLEAR_PRESETS });
  };

  // Reset Sums before recalc
  const resetSums = () => {
    dispatch({ type: RESET_SUMS });
  };

  // edit preset
  const setEdit = (preset) => {
    //console.log(preset);
    dispatch({ type: EDIT_PRESET, payload: preset });
  };

  // cancel edit preset
  const cancelEdit = () => {
    dispatch({ type: CANCEL_EDIT });
  };

  // Filter presets
  const filterPresets = (filter) => {
    dispatch({ type: FILTER_PRESETS, payload: filter });
  };

  // Filter out all presets with positive numbers and provided month and year
  const filterOutPositiveNumsAndMonth = (month) => {
    month && dispatch({ type: FILTER_POSNUMANDMONTH, payload: month });
  };

  // Filter out all presets with negative numbers and provided month
  const filterOutNegativeNumsAndMonth = (month) => {
    dispatch({ type: FILTER_NEGNUMANDMONTH, payload: month });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // calc prefilter
  const buildFlatListData = () => {
    filterOutPositiveNumsAndMonth();
    filterOutNegativeNumsAndMonth();
    // console.log(state.presets);
    // console.log(state.year);
    const monthToFilter = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const presetsByYearAndMonthArray = [
      [[], []],
      [[], []],
      [[], []],
      [[], []],
      [[], []],
      [[], []],
      [[], []],
      [[], []],
      [[], []],
      [[], []],
      [[], []],
      [[], []],
    ];
    const MonthIncomeExpenseSum = [
      [[], []],
      [[], []],
      [[], []],
      [[], []],
      [[], []],
      [[], []],
      [[], []],
      [[], []],
      [[], []],
      [[], []],
      [[], []],
      [[], []],
    ];

    if (state.presets !== null) {
      for (i = 0; i < state.presets.length; i++) {
        // loop presets
        for (a = 0; a < monthToFilter.length; a++) {
          // loop months
          MonthIncomeSumCounter = 0;
          MonthExpenseSumCounter = 0;
          if (
            state.presets[i].year.toString() === state.year.toString() &&
            state.presets[i].month.toString() === monthToFilter[a].toString()
          ) {
            // positive/negative number sort
            if (state.presets[i].number > 0) {
              presetsByYearAndMonthArray[a][0].push(state.presets[i]); // positive subarray holding presets by month
              //  MonthIncomeExpenseSum[a][0].push(state.presets[i].number); // positive subarray holding presetsnumber total sum by month
            } else {
              presetsByYearAndMonthArray[a][1].push(state.presets[i]); // negative subarray holding presets by month
              //  MonthIncomeExpenseSum[a][1].push(state.presets[i].number); // negative subarray holding presetsnumber total sum by month
            }
          }
        }
      }
    }

    // create additional subarray with month total sum income and expense
    const createIncomeExpenseMonthSum = () => {
      //--> presetsByYearAndMonthArray = [month],[[presetmonthPos][presetmonthNeg][totalPosSum][totalNegSum]]
      //                                                                               ^^^^
      for (m = 0; m < monthToFilter.length; m++) {
        const totalPosSum =
          MonthIncomeExpenseSum[m][0].length !== 0 && //if no presets, don't try to reduce
          MonthIncomeExpenseSum[m][0].reduce((total, num) => {
            return parseInt(Math.abs(total)) + parseInt(Math.abs(num));
          });

        //--> presetsByYearAndMonthArray = [month],[[presetmonthPos][presetmonthNeg][totalPosSum][totalNegSum]]
        //                                                                                           ^^^^
        presetsByYearAndMonthArray[m].push(totalPosSum);
        const totalNegSum =
          MonthIncomeExpenseSum[m][1].length !== 0 && //if no presets, don't try to reduce
          MonthIncomeExpenseSum[m][1].reduce((total, num) => {
            return parseInt(Math.abs(total)) + parseInt(Math.abs(num));
          });
        presetsByYearAndMonthArray[m].push(totalNegSum * -1);
      }
    };
    // createIncomeExpenseMonthSum();

    dispatch({ type: PRE_FILTER, payload: presetsByYearAndMonthArray });
  };

  const setPurchase = () => {
    dispatch({ type: SET_PURCHASE });
  };

  // Calculate Sum of presets
  const calcSum = () => {
    let presetArray = [];
    let TotalSum = 0;

    const dispatchSum = (presetArray) => {
      // checks if no presets exist then don't use .reduce , just return 0 for dispatch.
      if (presetArray.length !== 0) {
        TotalSum = presetArray.reduce((a, b) => a + b, 0);
        dispatch({ type: SUM, payload: TotalSum });
      } else {
        dispatch({ type: SUM, payload: 0 });
      }
    };

    state.presets.map((preset) => {
      preset.type !== 'purchase' && presetArray.push(parseFloat(preset.number));
    });
    dispatchSum(presetArray);
  };

  // Calc _ALL_ months sum
  const calcAllMonthSum = (montharray) => {
    dispatch({ type: RESET_ALLMONTHSUM });
    //iterera igenom alla månader
    montharray.map((month) => {
      //array att iterera igenom
      let presetArray = [];
      //håller uträknade summan
      let TotalMonthSum = 0;
      if (state.year === '2019' || state.year === 2019) {
        state.presets.map((preset) => {
          if (
            preset.year === undefined ||
            preset.year === '2019' ||
            (preset.year === 2019 &&
              preset.month === month &&
              preset.type !== 'savings' &&
              preset.type !== 'capital' &&
              preset.type !== 'purchase')
          )
            presetArray.push(parseFloat(preset.number));
        });
      } else {
        state.presets.map((preset) => {
          if (
            preset.year == state.year &&
            preset.month === month &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.type !== 'purchase'
          )
            presetArray.push(parseFloat(preset.number));
        });
      }
      // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
      if (presetArray.length !== 0) {
        TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
        dispatch({ type: SET_ALLMONTHSUM, payload: TotalMonthSum });
      } else {
        TotalMonthSum = 0;
        dispatch({ type: SET_ALLMONTHSUM, payload: TotalMonthSum });
      }
    });
  };

  // Calc month sum
  const calcMonthSum = (month) => {
    // console.log('month');
    //console.log(month);
    //console.log(state.month);
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        if (
          preset.year === undefined ||
          (preset.year == '2019' &&
            preset.month === state.month &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.type !== 'purchase')
        )
          presetArray.push(parseFloat(preset.number));
      });
    } else {
      state.presets.map((preset) => {
        if (
          preset.year == state.year &&
          preset.month === state.month &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.type !== 'purchase'
        )
          presetArray.push(parseFloat(preset.number));
      });
    }
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: MONTHSUM, payload: TotalMonthSum });
    } else {
      TotalMonthSum = 0;
      dispatch({ type: MONTHSUM, payload: TotalMonthSum });
    }
  };

  // Calc Positive month sum
  const calcPosMonth = (filteredmonthandposnum) => {
    //console.log('calcPosMonth');
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    filteredmonthandposnum &&
      state.filteredmonthandposnum.map((preset) => {
        presetArray.push(parseFloat(preset.number));
      });
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: POSMONTHSUM, payload: TotalMonthSum });
    } else {
      dispatch({ type: POSMONTHSUM, payload: 0 });
    }
  };

  // Calc Negative month sum
  const calcNegMonth = (filteredmonthandnegnum) => {
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let negnum = 0;
    filteredmonthandnegnum &&
      state.filteredmonthandnegnum.map((preset) => {
        presetArray.push(parseFloat(preset.number));
      });
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      negnum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: NEGMONTHSUM, payload: negnum });
    } else {
      dispatch({ type: NEGMONTHSUM, payload: 0 });
    }
  };

  // calculate sum of provided category and month
  const calcCategoryByMonth = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    state.presets.map((preset) => {
      preset.type !== null &&
        preset.type !== 'purchase' &&
        preset.type !== 'savings' &&
        preset.type !== 'capital' &&
        preset.month === state.month &&
        categoriesArray.push(preset.category);
    });
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });
    //console.log(`Unika kategorier: ${UniqueCatThisMonth.length}`);
    let MajorArray = [];
    let i; // yttre loop som itererar igenom kategorier
    for (i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray = [];
      let SumOfCat;
      let CatAndSumList = [];

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      if (state.year === '2019' || state.year === 2019) {
        state.presets.map((preset) => {
          preset.year === undefined ||
            (preset.year == '2019' &&
              preset.type !== null &&
              preset.type !== 'purchase' &&
              preset.type !== 'savings' &&
              preset.type !== 'capital' &&
              preset.month === state.month &&
              preset.category === UniqueCatThisMonth[i] &&
              presetByCatArray.push(preset.number));
        }); // end inner loop
      } else {
        state.presets.map((preset) => {
          preset.year == state.year &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.month === state.month &&
            preset.category === UniqueCatThisMonth[i] &&
            presetByCatArray.push(preset.number);
        }); // end inner loop
      }
      SumOfCat = presetByCatArray.reduce((a, b) => a + b, 0);
      let cat = UniqueCatThisMonth[i];

      CatAndSumList = {
        id: i,
        SumOfCat,
        cat,
      };
      SumOfCat !== 0 && MajorArray.push(CatAndSumList);
    }
    dispatch({ type: CATEGORYMONTHSUM, payload: MajorArray });
  };

  // calculate sum of provided category and year and put together in one array
  const calcCategoryByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        preset.year === undefined ||
          (preset.year == '2019' &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            categoriesArray.push(preset.category));
      });
    } else {
      state.presets.map((preset) => {
        preset.year == state.year &&
          preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          categoriesArray.push(preset.category);
      });
    }
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });
    //console.log(`Unika kategorier: ${UniqueCatThisMonth.length}`);
    let MajorArray = [];
    let i; // yttre loop som itererar igenom kategorier
    for (i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray = [];
      let SumOfCat;
      let CatAndSumList = [];

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      if (state.year === '2019' || state.year === 2019) {
        state.presets.map((preset) => {
          preset.year === undefined ||
            (preset.year == '2019' &&
              preset.type !== null &&
              preset.type !== 'purchase' &&
              preset.type !== 'savings' &&
              preset.type !== 'capital' &&
              preset.category === UniqueCatThisMonth[i] &&
              presetByCatArray.push(preset.number));
        }); // end inner loop
      } else {
        state.presets.map((preset) => {
          preset.year == state.year &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.category === UniqueCatThisMonth[i] &&
            presetByCatArray.push(preset.number);
        }); // end inner loop
      }
      SumOfCat = presetByCatArray.reduce((a, b) => a + b, 0);
      let cat = UniqueCatThisMonth[i];
      CatAndSumList = {
        id: i,
        SumOfCat,
        cat,
      };
      MajorArray.push(CatAndSumList);
    }
    dispatch({ type: CATEGORYYEARSUM, payload: MajorArray });
  };

  // calculate sum of provided category and year and put _only_ the sum in an array.
  const calcCategorySumOnlyByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        preset.year === undefined ||
          (preset.year == '2019' &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            categoriesArray.push(preset.category));
      });
    } else {
      state.presets.map((preset) => {
        preset.year == state.year &&
          preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          categoriesArray.push(preset.category);
      });
    }
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });
    //console.log(`Unika kategorier: ${UniqueCatThisMonth.length}`);
    let MajorArray = [];
    let i; // yttre loop som itererar igenom kategorier
    for (i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray = [];
      let SumOfCat;

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      state.presets.map((preset) => {
        preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.category === UniqueCatThisMonth[i] &&
          presetByCatArray.push(preset.number);
      }); // end inner loop
      SumOfCat = presetByCatArray.reduce((a, b) => a + b, 0);
      MajorArray.push(SumOfCat);
    }
    dispatch({ type: CATEGORYSUMONLYBYYEAR, payload: MajorArray });
  };

  // calculate sum of provided category and year and put _only_ the _POSITIVE_ sum in an array.
  const calcCategorySumOnlyPosNumByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        preset.year === undefined ||
          (preset.year == '2019' &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.number > 0 &&
            categoriesArray.push(preset.category));
      });
    } else {
      state.presets.map((preset) => {
        preset.year == state.year &&
          preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.number > 0 &&
          categoriesArray.push(preset.category);
      });
    }
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });
    //console.log(`Unika kategorier: ${UniqueCatThisMonth.length}`);
    let MajorArray = [];
    let i; // yttre loop som itererar igenom kategorier
    for (i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray = [];
      let SumOfCat;

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      if (state.year === '2019' || state.year === 2019) {
        state.presets.map((preset) => {
          preset.year === undefined ||
            (preset.year == '2019' &&
              preset.type !== null &&
              preset.type !== 'purchase' &&
              preset.type !== 'savings' &&
              preset.type !== 'capital' &&
              preset.number > 0 &&
              preset.category === UniqueCatThisMonth[i] &&
              presetByCatArray.push(preset.number));
        }); // end inner loop
      } else {
        state.presets.map((preset) => {
          preset.year == state.year &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.number > 0 &&
            preset.category === UniqueCatThisMonth[i] &&
            presetByCatArray.push(preset.number);
        }); // end inner loop
      }
      SumOfCat = presetByCatArray.reduce((a, b) => a + b, 0);
      MajorArray.push(SumOfCat);
    }
    dispatch({ type: CATEGORY_SUMONLYPOSNUM_BYYEAR, payload: MajorArray });
  };

  // calculate sum of provided category and year and put _only_ the _NEGATIVE_ sum in an array.
  const calcCategorySumOnlyNegNumByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        preset.year === undefined ||
          (preset.year == '2019' &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.number < 0 &&
            categoriesArray.push(preset.category));
      });
    } else {
      state.presets.map((preset) => {
        preset.year == state.year &&
          preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.number < 0 &&
          categoriesArray.push(preset.category);
      });
    }
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });
    //console.log(`Unika kategorier: ${UniqueCatThisMonth.length}`);
    let MajorArray = [];
    let i; // yttre loop som itererar igenom kategorier
    for (i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray = [];
      let SumOfCat;

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      if (state.year === '2019' || state.year === 2019) {
        state.presets.map((preset) => {
          preset.year === undefined ||
            (preset.year == '2019' &&
              preset.type !== null &&
              preset.type !== 'purchase' &&
              preset.type !== 'savings' &&
              preset.type !== 'capital' &&
              preset.number < 0 &&
              preset.category === UniqueCatThisMonth[i] &&
              presetByCatArray.push(preset.number));
        }); // end inner loop
      } else {
        state.presets.map((preset) => {
          preset.year == state.year &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.number < 0 &&
            preset.category === UniqueCatThisMonth[i] &&
            presetByCatArray.push(preset.number);
        }); // end inner loop
      }
      SumOfCat = presetByCatArray.reduce((a, b) => a + b, 0);
      MajorArray.push(Math.abs(SumOfCat));
    }
    dispatch({ type: CATEGORY_SUMONLYNEGNUM_BYYEAR, payload: MajorArray });
  };

  // get ONLY categoryNAME by year to use in apexcharts
  const setCategoryNameOnlyByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        preset.year === undefined ||
          (preset.year == '2019' &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            categoriesArray.push(preset.category));
      });
    } else {
      state.presets.map((preset) => {
        preset.year == state.year &&
          preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          categoriesArray.push(preset.category);
      });
    }
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });

    dispatch({ type: CATEGORY_NAMEONLY_BYYEAR, payload: UniqueCatThisMonth });
  };

  // get POSITIVE ONLY categoryNAME by year to use in apexcharts
  const setCategoryNameOnlyPosNumByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        preset.year === undefined ||
          (preset.year == '2019' &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.number > 0 &&
            categoriesArray.push(preset.category));
      });
    } else {
      state.presets.map((preset) => {
        preset.year == state.year &&
          preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.number > 0 &&
          categoriesArray.push(preset.category);
      });
    }
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });

    dispatch({
      type: CATEGORY_NAMEONLYPOSNUM_BYYEAR,
      payload: UniqueCatThisMonth,
    });
  };

  // get _NEGATIVE_ ONLY categoryNAME by year to use in apexcharts
  const setCategoryNameOnlyNegNumByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        preset.year === undefined ||
          (preset.year == '2019' &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.number < 0 &&
            categoriesArray.push(preset.category));
      });
    } else {
      state.presets.map((preset) => {
        preset.year == state.year &&
          preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.number < 0 &&
          categoriesArray.push(preset.category);
      });
    }
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });

    dispatch({
      type: CATEGORY_NAMEONLYNEGNUM_BYYEAR,
      payload: UniqueCatThisMonth,
    });
  };
  ////////////////////////////////////
  const calcYearsum = () => {
    let numberArray = [];
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        preset.year === undefined ||
          (preset.year == '2019' &&
            preset.type !== null &&
            preset.type !== 'purchase' && // måste ha NOT eftersom det finns vissa värden i databasen som saknar preset.type helt
            preset.type !== 'savings' && // då de las in före .type las till i backend.
            preset.type !== 'capital' &&
            numberArray.push(parseFloat(preset.number)));
      });
    } else {
      state.presets.map((preset) => {
        preset.year == state.year &&
          preset.type !== null &&
          preset.type !== 'purchase' && // måste ha NOT eftersom det finns vissa värden i databasen som saknar preset.type helt
          preset.type !== 'savings' && // då de las in före .type las till i backend.
          preset.type !== 'capital' &&
          numberArray.push(parseFloat(preset.number));
      });
    }

    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (numberArray.length !== 0) {
      const TotalSum = numberArray.reduce((a, b) => a + b, 0);
      dispatch({ type: YEARSUM, payload: TotalSum });
    } else dispatch({ type: YEARSUM, payload: 0 });
  };

  // Calc savings sum
  const calcSavings = () => {
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    state.presets.map((preset) => {
      if (preset.type === 'savings') presetArray.push(parseFloat(preset.number));
    });
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: CALCSAVINGS, payload: TotalMonthSum });
    } else {
      // console.log('no savings to calculate on this user ');
    }
  };

  // Calc savings by month
  const calcMonthSavings = () => {
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    if (state.year === 2019 || state.year === '2019') {
      state.presets.map((preset) => {
        if (preset.year === undefined || (preset.year == '2019' && preset.type === 'savings' && preset.month === state.month))
          presetArray.push(parseFloat(preset.number));
      });
    } else {
      state.presets.map((preset) => {
        if (preset.year == state.year && preset.type === 'savings' && preset.month === state.month)
          presetArray.push(parseFloat(preset.number));
      });
    }
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: CALC_MONTH_SAVINGS, payload: TotalMonthSum });
      //console.log(`monthsavings: ${TotalMonthSum} in ${state.month} `);
    } else {
      dispatch({ type: CALC_MONTH_SAVINGS, payload: 0 });
      //console.log(`no monthsavings to calculate in ${state.month} `);
    }
  };

  // calc month balance
  const calcMonthBalance = () => {
    const totalsum = state.MonthSum - state.monthsavings - state.SumPiggybanksMonth;
    //console.log(state.MonthSum);
    //console.log(state.monthsavings);
    //console.log(state.SumPiggybanksMonth);
    dispatch({ type: CALC_MONTH_BALANCE, payload: totalsum });
  };

  // Get presets with savings added in this month and purchases with piggybanksavings added in this month
  const getMonthSavings = (month) => {
    if (state.year === '2019' || state.year === 2019) {
      const filter = state.presets.filter(
        (preset) => preset.year === undefined || (preset.year == '2019' && preset.type === 'savings' && preset.month === state.month)
      );
      dispatch({ type: GET_MONTHSAVINGS, payload: filter });
    } else {
      const filter = state.presets.filter(
        (preset) => preset.year == state.year && preset.type === 'savings' && preset.month === state.month
      );
      dispatch({ type: GET_MONTHSAVINGS, payload: filter });
    }
  };

  // Get presets with piggybank-savings added this month
  const getMonthPiggySavings = () => {
    dispatch({ type: GET_MONTHPIGGYSAVINGS, payload: state.month });
  };
  // Calc capital sum
  const calcCapital = () => {
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    state.presets.map((preset) => {
      if (preset.type === 'capital') presetArray.push(parseFloat(preset.number));
    });
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: CALCCAPITAL, payload: TotalMonthSum });
    } else {
      dispatch({ type: CALCCAPITAL, payload: 0 });
      // console.log('no capital to calculate ');
    }
  };

  const setActivePiggybank = (piggybank) => {
    dispatch({ type: SET_ACTIVE_PIGGYBANK, payload: piggybank });
  };

  const addtoPiggybanks = (object) => {
    dispatch({ type: ADDTO_PIGGYBANK, payload: object });
  };

  const clearPiggybanks = () => {
    dispatch({ type: CLEAR_PIGGYBANKS });
  };

  const deletePiggybank = (Item) => {
    dispatch({ type: DELETE_PIGGYBANK, payload: Item });
  };

  const setTotalOfAllPiggybanksThisMonth = (Sum) => {
    dispatch({ type: SUM_PIGGYBANKS_MONTH, payload: Sum });
    //console.log('ran');
  };

  const setMonthPiggySavingsSums = (array) => {
    dispatch({ type: SET_MONTH_PIGGYSAVINGS, payload: array });
  };

  const submitCsvItems = (string) => {
    dispatch({ type: SUBMIT_CSV, payload: string });
  };
  return (
    <PresetContext.Provider
      value={{
        presets: state.presets,
        edit: state.edit,
        error: state.error,
        sum: state.sum,
        month: state.month,
        MonthSum: state.MonthSum,
        filteredmonthandposnum: state.filteredmonthandposnum,
        filteredmonthandnegnum: state.filteredmonthandnegnum,
        PosMonthSum: state.PosMonthSum,
        NegMonthSum: state.NegMonthSum,
        categorymonthsum: state.categorymonthsum,
        categoryyearsum: state.categoryyearsum,
        categorysumonlybyyear: state.categorysumonlybyyear,
        categorynameonlybyyear: state.categorynameonlybyyear,
        year: state.year,
        yearsum: state.yearsum,
        savings: state.savings,
        capital: state.capital,
        purchases: state.purchases,
        categorynameonlyposnumbyyear: state.categorynameonlyposnumbyyear,
        categorynameonlynegnumbyyear: state.categorynameonlynegnumbyyear,
        categorysumonlyposnumbyyear: state.categorysumonlyposnumbyyear,
        categorysumonlynegnumbyyear: state.categorysumonlynegnumbyyear,
        AllMonthSum: state.AllMonthSum,
        piggybanks: state.piggybanks,
        monthsavings: state.monthsavings,
        monthsavingspresets: state.monthsavingspresets,
        monthpiggysavings: state.monthpiggysavings,
        SumPiggybanksMonth: state.SumPiggybanksMonth,
        MonthBalance: state.MonthBalance,
        csvpresets: state.csvpresets,
        doSubmitCsv: state.doSubmitCsv,
        prefilter: state.prefilter,
        calculating: state.calculating,
        MonthPiggySavingsSums: state.MonthPiggySavingsSums,
        addPreset,
        calcSum,
        deletePreset,
        setEdit,
        cancelEdit,
        sendEdit,
        getPresets,
        clearPresets,
        addMonth,
        filterPresets,
        filtered: state.filtered,
        clearFilter,
        calcMonthSum,
        filterOutPositiveNumsAndMonth,
        filterOutNegativeNumsAndMonth,
        calcPosMonth,
        calcNegMonth,
        calcCategoryByMonth,
        calcCategoryByYear,
        resetSums,
        setYear,
        calcYearsum,
        calcSavings,
        calcCapital,
        setPurchase,
        calcCategorySumOnlyByYear,
        setCategoryNameOnlyByYear,
        setCategoryNameOnlyPosNumByYear,
        setCategoryNameOnlyNegNumByYear,
        calcCategorySumOnlyPosNumByYear,
        calcCategorySumOnlyNegNumByYear,
        calcAllMonthSum,
        addtoPiggybanks,
        setActivePiggybank,
        clearPiggybanks,
        calcMonthSavings,
        getMonthSavings,
        getMonthPiggySavings,
        setMonthPiggySavingsSums,
        deletePiggybank,
        setTotalOfAllPiggybanksThisMonth,
        calcMonthBalance,
        uploadCSV,
        submitCsvItems,
        updateCsvPresets,
        clearCsv,
        removeCSV,
        buildFlatListData,
      }}
    >
      {props.children}
    </PresetContext.Provider>
  );
};

export default PresetState;
