<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\LoginVerificationCode;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // validate phone number
        $request->validate([
            'phone' => 'required|min:10|numeric'
        ]);

        // find or create a user model
        $user = User::firstOrCreate([
           'phone' => $request->phone
        ]);

        if (! $user) {
            return response()->json(['message' => 'Could not process a user with that phone number.'], 401);
        }

        // send an otp
        $user->notify(new LoginVerificationCode());

        // return response
        return response()->json(['message' => 'Text message notification sent']);
    }

    public function verify(Request $request)
    {
        //validate request
        $request->validate([
            'phone' => 'required|numeric|min:10',
            'login_code' => 'required|numeric|between:111111,999999'
        ]);

        //find a user
        $user = User::where('phone',$request->phone)
            ->where('login_code',$request->login_code)
            ->first();

        // check code
        // return back with token
        if ($user) {
            $user->update([
                'login_code' => null
            ]);

            return $user->createToken($request->login_code)->plainTextToken;
        }
        // return back a message
        return response()->json(['message' => 'Invalid verification code.'], 401);

    }

    public function user(Request $request)
    {
        return $request->user();
    }
}
