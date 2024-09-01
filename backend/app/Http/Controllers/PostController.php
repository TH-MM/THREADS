<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    
    
    public function index(){
        $posts = Post::with("user")->with('likes')->orderBy('created_at' , "desc")->get();
        return response()->json(['message' => "all posts are here." , compact('posts')] , 200);
    }

    public function store(Request $request){
        $postCounter = Post::count();
        $roles = [
            "content" => "string|max:300",
            "image" => "",
        ];
        if($request->image == "null"){
            $roles["content"] .= "|required";
        }else{
            $roles["image"] .= "file|image|mimes:jpg,png,jpeg";
        }
        $request->validate($roles);

        $post = new Post();
        $post->content = $request->content;
        if($request->hasFile('image')){
            $path = $request->file('image')->storeAs('postImages' , 'post'.date('_D_M_Y_').$postCounter.$request->file('image')->getClientOriginalExtension() , 'public');
            $post->image = $path;
        }
        $post->user_id = Auth::id();
        $post->save();

        return response()->json(["message" => "post has been created successfully !!"] , 200);
    }
}
