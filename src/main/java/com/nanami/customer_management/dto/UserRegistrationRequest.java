package com.nanami.customer_management.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRegistrationRequest(

        @NotBlank(message = "名前を入力してください。")
        String name,

        @NotBlank(message = "メールアドレスを入力してください。")
        @Email(message = "メールアドレスの形式が正しくありません。")
        String email,

        @NotBlank(message = "パスワードを入力してください。")
        @Size(
                min = 8,
                message = "パスワードは8文字以上で入力してください。"
        )
        String password

) {
}