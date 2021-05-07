import { debounceTime, map, filter, switchMap} from 'rxjs/operators';
import {combineLatest, from, fromEvent, Observable, zip} from '../node_modules/rxjs';
import {IHrana, IOsvezenje, IPrilog} from './interfaces';
import {showPrilog, showOsvezenja, showFood, showNarudzbina} from './drawing'


const FETCH_URL = "http://localhost:3000";

export function searchForFood(hrana_input:HTMLInputElement, prilog_input:HTMLInputElement, osvezenje_input:HTMLInputElement, narudzbina_lbl:HTMLLabelElement, hrana_lbl:HTMLLabelElement, prilog_lbl:HTMLLabelElement, osvezenje_lbl:HTMLLabelElement){

    const hrana1=hranaInputObs(hrana_input, hrana_lbl)
    hrana1.subscribe((hrana:IHrana) => showFood(hrana, hrana_lbl));

    const prilog1=prilogInputObs(prilog_input, prilog_lbl)
    prilog1.subscribe((prilog:IPrilog)=> showPrilog(prilog, prilog_lbl));

    const pice1=piceInputObs(osvezenje_input, osvezenje_lbl)
    pice1.subscribe((pice:IOsvezenje) => showOsvezenja(pice, osvezenje_lbl));   

    sastaviNarudzbinu(hrana1, prilog1, pice1, narudzbina_lbl);
}

function hranaInputObs(inputEl:HTMLInputElement, labelEl:HTMLLabelElement){
    return fromEvent(inputEl, "input")
    .pipe(
        debounceTime(500),
        map((ev:InputEvent) => (<HTMLInputElement>ev.target).value),
        filter((text) => text.length >= 4),
        switchMap( text => getFood(text, labelEl)),
        map(text => text[0])
        
    );
}

function prilogInputObs(inputEl:HTMLInputElement, labelEl:HTMLLabelElement){
    return fromEvent(inputEl, "input")
    .pipe(
        debounceTime(500),
        map((ev:InputEvent) => (<HTMLInputElement>ev.target).value),
        filter((text) => text.length >= 4),
        switchMap( text => getPrilog(text, labelEl)),
        map(text => text[0])
        
    );
}

function piceInputObs(inputEl:HTMLInputElement, labelEl:HTMLLabelElement){
    return fromEvent(inputEl, "input")
    .pipe(
        debounceTime(500),
        map((ev:InputEvent) => (<HTMLInputElement>ev.target).value),
        filter((text) => text.length >= 4),
        switchMap( text => getOsvezenje(text, labelEl)),
        map(text => text[0])
        
    );
}


function sastaviNarudzbinu(hrana1:Observable<IHrana>, prilog1:Observable<IPrilog>, pice1:Observable<IOsvezenje>, narudzbina_lbl:HTMLLabelElement){

    combineLatest([hrana1, prilog1, pice1]).pipe(
        map(([hrana1, prilog1, pice1])=>([hrana1, prilog1, pice1])),
       filter(([hrana1, prilog1, pice1])=>hrana1!==undefined),
       filter(([hrana1, prilog1, pice1])=>prilog1!==undefined),
       filter(([hrana1, prilog1, pice1])=>pice1!==undefined),
       
       // filter(([hrana1, prilog1, pice1])=> (hrana1!==undefined&&prilog1!==undefined&&pice1!==undefined))
        //filter(hrana1 => hrana1!==undefined), ne moze ovako
        //filter(prilog1 => prilog1!=undefined),
        //filter(pice1 => pice1!==undefined)
    )
    .subscribe(x=>showNarudzbina(x[0].vrsta, x[1].vrsta, x[2].vrsta,narudzbina_lbl));

}


function getFood(hrana:string, hrana_lbl:HTMLLabelElement):Observable<IHrana[]>{
    return from(
        fetch(`${FETCH_URL}/hrana/?vrsta=${hrana}`)
        .then((response)=>{
            if(!response.ok){
                throw new Error("Hrana nije pronadjena");
            }
            else{
                let data=response.json(); //moze samo return response.json() ovo je proba za nesto drugo
                return data;
            }
        })
        .catch((err)=>hrana_lbl.innerHTML="greska")
    );
}

function getPrilog(prilog:string, prilog_lbl:HTMLLabelElement):Observable<IPrilog[]>{
    return from(
        fetch(`${FETCH_URL}/prilog/?vrsta=${prilog}`)
        .then((res)=>{
            if(res.ok)
                return res.json();
            else
                throw new Error("Prilog nije pronadjen");
        })
        .catch((err)=>prilog_lbl.innerHTML="greska")
    );
}

function getOsvezenje(pice:string, osvezenje_lbl:HTMLLabelElement):Observable<IOsvezenje[]>{
    return from(
        fetch(`${FETCH_URL}/osvezenje/?vrsta=${pice}`)
        .then((res)=>{
            if(res.ok)
                return res.json();
            else
                throw new Error("Pice nije pronadjeno");
        })
        .catch((err)=>osvezenje_lbl.innerHTML="greska")
    );
}