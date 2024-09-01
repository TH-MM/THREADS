<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function index()
    {
        $likes = Like::get();
        return response()->json(compact('likes') , 200);
    }

    public function like($postId)
    {
        $post = Post::find($postId);
        $user = auth()->id();
        $isLiked = Like::where('user_id', $user)->where('post_id', $post->id)->first();

        if ($isLiked) {
            $post->likes_count -= 1;
            $isLiked->delete();
            $post->save();
            return response()->json(["message" => "like has been deleted successfully !!"], 200);
        } else {
            $post->likes_count += 1;
            $like = new Like();
            $like->user_id = auth()->id();
            $like->post_id = $postId;
            $like->save();
            $post->save();
            return response()->json(["message" => "like has been added successfully !!"], 200);
        }
    }
}
