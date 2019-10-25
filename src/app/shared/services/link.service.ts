import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  Config = {
    MAX_LINK_LENGH: 30,
  };

  constructor() { }

  public cutLink(str: string): string {
    return this.removeAccents(
      str
        .split(' ')
        .splice(0, this.Config.MAX_LINK_LENGH)
        .join(' ')
        .replace(/\s/g, '-')
    ).toLowerCase();
  }

  private removeAccents(strAccents): string {
    var strAccents = strAccents.split('');
    var strAccentsOut = [];
    const strAccentsLen = strAccents.length;
    let accents = 'ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØŐòóôőõöøĎďDŽdžÈÉÊËĘèéêëęðÇçČčĆćÐÌÍÎÏìíîïÙÚÛÜŰùűúûüĽĹŁľĺłÑŇŃňñńŔŕŠŚšśŤťŸÝÿýŽŻŹžżź?';
    let accentsOut = "AAAAAAAaaaaaaasOOOOOOOOoooooooDdDZdzEEEEEeeeeeeCcCcCcDIIIIiiiiUUUUUuuuuuLLLlllNNNnnnRrSSssTtYYyyZZZzzz";
    for (let y = 0; y < strAccentsLen; y++) {
      if (accents.indexOf(strAccents[y]) != -1) {
        strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
      } else
        strAccentsOut[y] = strAccents[y];
    }
    strAccentsOut = <any>strAccentsOut.join('');
    return strAccentsOut.toString();
  }
}
