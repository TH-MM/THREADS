<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{

    public function update(Request $request)
    {
        $user = Auth::user();

        $roles = [
            'name' => "string|max:255",
            'username' => "required|string|max:255",
            'email' => "required|string|email",
            'bio' => "string|max:250|nullable",
            'website' => "url|string|max:100|nullable",
            'profile_picture' => "max:2048|nullable",
        ];

        if (Auth::user()->username != $request->username) {
            $roles["username"] .= '|unique:users';
        }

        if (Auth::user()->email != $request->email) {
            $roles["username"] .= '|unique:users';
        }

        if ($request->profile_picture != "null") {
            $roles['profile_picture'] .= '|file|image|mimes:jpeg,png,jpg';
        }

        $request->validate($roles);

        if ($request->profile_picture != "null") {
            if ($request->hasFile('profile_picture')) {
                if ($user->profile_picture && $user->profile_picture != "default/default_profile_picture.png") {
                    Storage::disk('public')->delete($user->profile_picture);
                }
                $file = $request->file('profile_picture');
                $fileName = 'profile_picture_user_' . $user->id . "." . $file->getClientOriginalExtension();
                $path = $file->storeAs("profile", $fileName, "public");
            }
        }

        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->bio = $request->bio;
        $user->website = $request->website;

        if ($request->profile_picture == "null" && $user->profile_picture == "default/default_profile_picture.png") {
            $user->profile_picture = "default/default_profile_picture.png";
        } else if ($request->profile_picture != "null") {
            $user->profile_picture = $path;
        }

        $user->save();

        return response()->json(["message" => "profile has updated successfully !!", "updated" => true]);
    }

    public function user($id)
    {
        $user = User::with('posts')->where('id', $id);
        return response()->json(compact('user'), 200);
    }

    //
    public function allUsers()
    {
        $users = User::all();
        return response()->json(compact('users'), 200);
    }
}
