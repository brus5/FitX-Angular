import {Component, Input} from '@angular/core';
import {News} from '../../../shared/models/news';
import {NewsService} from '../../services/news.service';

@Component({
  selector: 'news-tile',
  templateUrl: './news-tile.component.html',
  styleUrls: ['./news-tile.component.scss']
})
export class NewsTileComponent {
  @Input('news') news: News;
  @Input('isAdmin') isAdmin: boolean;
  Config = {
    MAX_WORDS: 50,
    MAX_LINK_WORDS: 5,
  };


  constructor(private _newsService: NewsService) {
  }

  get readMore(): boolean {
    return (this.wordCount > this.Config.MAX_WORDS);
  }

  get wordCount() {
    return this.news.content.split(' ').length;
  }

  get cuttedContent(): string {
    return this.news.content.split(' ').splice(0, this.Config.MAX_WORDS).join(' ');
  }

  get cuttedLink(): string {
    return this._newsService.removeAccents(this.news.title.split(' ').splice(0, this.Config.MAX_LINK_WORDS).join(' ').replace(/\s/g, '-')).toLowerCase();
  }



}
// TODO 1


// function RemoveAccents(strAccents) {
//   var strAccents = strAccents.split('');
//   var strAccentsOut = [];
//   var strAccentsLen = strAccents.length;
//   let accents = 'ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØŐòóôőõöøĎďDŽdžÈÉÊËĘèéêëęðÇçČčĆćÐÌÍÎÏìíîïÙÚÛÜŰùűúûüĽĹŁľĺłÑŇŃňñńŔŕŠŚšśŤťŸÝÿýŽŻŹžżź';
//   let accentsOut = "AAAAAAAaaaaaaasOOOOOOOOoooooooDdDZdzEEEEEeeeeeeCcCcCcDIIIIiiiiUUUUUuuuuuLLLlllNNNnnnRrSSssTtYYyyZZZzzz";
//   for (var y = 0; y < strAccentsLen; y++) {
//     if (accents.indexOf(strAccents[y]) != -1) {
//       strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
//     } else
//       strAccentsOut[y] = strAccents[y];
//   }
//   strAccentsOut = strAccentsOut.join('');
//   return strAccentsOut;
// }
