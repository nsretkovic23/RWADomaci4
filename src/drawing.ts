import { IHrana, IOsvezenje, IPrilog } from "./interfaces";

export  function drawPage(unosDiv:HTMLDivElement, hrana_input:HTMLInputElement, prilog_input:HTMLInputElement, osvezenje_input:HTMLInputElement, hrana_lbl:HTMLLabelElement, prilog_lbl:HTMLLabelElement, osvezenje_lbl:HTMLLabelElement,narudzbinaDiv:HTMLDivElement, narudzbina_lbl:HTMLLabelElement)
{
    unosDiv.classList.add("unosDiv");
    document.body.appendChild(unosDiv);

    unosDiv.appendChild(hrana_input);

    unosDiv.appendChild(hrana_lbl);
    hrana_lbl.innerHTML="ovde je hrana";

    unosDiv.appendChild(prilog_input);

    unosDiv.appendChild(prilog_lbl);
    prilog_lbl.innerHTML="ovde je prilog";

    unosDiv.appendChild(osvezenje_input);

    unosDiv.appendChild(osvezenje_lbl);
    osvezenje_lbl.innerHTML="ovde je pice";

    narudzbinaDiv.classList.add("narudzbinaDiv");
    document.body.appendChild(narudzbinaDiv);

    narudzbinaDiv.appendChild(narudzbina_lbl);
    narudzbina_lbl.innerHTML="ovde je narudzbina";
}

export  function showFood(hrana:IHrana, hrana_lbl:HTMLLabelElement)
{
    if(hrana===undefined)
    {
        hrana_lbl.innerHTML="greska";
    }
    else{
        hrana_lbl.innerHTML=`${hrana["vrsta"]} ${hrana.cena}RSD`;
        console.log(hrana);
    }
}

export function showPrilog(prilog:IPrilog, prilog_lbl:HTMLLabelElement)
{
    if(prilog===undefined)
    {
        prilog_lbl.innerHTML="greska";
    }
    else{
        prilog_lbl.innerHTML=`${prilog["vrsta"]}`;
        console.log(prilog);
    }
}

export function showOsvezenja(pice:IOsvezenje, osvezenje_lbl:HTMLLabelElement)
{
    if(pice===undefined)
    {
        osvezenje_lbl.innerHTML="greska";
    }
    else{
        osvezenje_lbl.innerHTML=`${pice["vrsta"]} ${pice.cena}RSD`;
        console.log(pice);
    }
}

export function showNarudzbina(hrana:string, prilog:string, pice:string, narudzbina_lbl:HTMLLabelElement)
{
    if(hrana!==undefined && prilog!==undefined && pice!==undefined)
        narudzbina_lbl.innerHTML=`Zelite da narucite: ${hrana}, sa prilogom: ${prilog} i sa picem: ${pice} ?`;
    else
        narudzbina_lbl.innerHTML=`Uneli ste pogresno neki podatak`;
}

