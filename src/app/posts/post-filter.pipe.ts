import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../models/posts.model';

@Pipe({
  name:'postsFilter'
})
export class PostFilterPipe implements PipeTransform{
  transform(posts: Post[], name: string): Post[] {
    if (!posts||name){
      return posts;
    }
    if (name === undefined) {
      return posts;
    }


    return posts.filter(posts=>
    posts.name.toLowerCase().indexOf(name.toLowerCase()))

  }

}
