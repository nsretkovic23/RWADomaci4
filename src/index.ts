import { debounceTime, map, filter, switchMap} from 'rxjs/operators';
import {combineLatest, from, fromEvent, Observable, zip} from '../node_modules/rxjs';
import {drawPage} from './drawing';
import {IHrana, IOsvezenje, IPrilog} from './interfaces';
import {searchForFood} from './observables';

const unosDiv=document.createElement("div");

const hrana_input = document.createElement("input");


const hrana_lbl = document.createElement("label");

const prilog_input = document.createElement("input");

const prilog_lbl = document.createElement("label");

const osvezenje_input = document.createElement("input");

const osvezenje_lbl = document.createElement("label");


const narudzbinaDiv=document.createElement("div");

const narudzbina_lbl = document.createElement("label");

drawPage(unosDiv, hrana_input, prilog_input,  osvezenje_input, hrana_lbl, prilog_lbl, osvezenje_lbl, narudzbinaDiv, narudzbina_lbl);

searchForFood(hrana_input, prilog_input, osvezenje_input, narudzbina_lbl, hrana_lbl, prilog_lbl, osvezenje_lbl);
