package com.example.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.dao.UserRepository;
import com.example.dao.UserRoleRepository;
import com.example.model.User;
import com.example.model.UserRole;

@Controller
@RequestMapping("/public")
public class SigninUserController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserRoleRepository userRoleRepository;

	@ResponseBody
	@RequestMapping(value = "/signinUser", method = RequestMethod.POST, consumes = { "application/json" })
	public ResponseEntity<?> signinUser(@RequestBody Map<String, String> vo) {

		System.out.println("signin user !");

		final Map<String, String> body = new HashMap<String, String>();

		try {

			// TODO falta implementar
			final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			final String hashedPassword = passwordEncoder.encode(vo.get("password"));

			final User user = new User();
			user.setUsername(vo.get("username"));
			user.setPassword(hashedPassword);
			user.setEnabled(true);
			userRepository.save(user);

			final UserRole userRole = new UserRole();
			userRole.setRole("ROLE_USER");
			userRole.setUser(user);
			userRoleRepository.save(userRole);

		} catch (Exception e) {
			// TODO: handle exception
			body.put("message", "Erro ao tentar criar usuário!");
			return ResponseEntity.badRequest().body(body);
		}

		body.put("message", "ok");
		return ResponseEntity.ok(body);
	}

	@ResponseBody
	@RequestMapping(value = "/usernameVerify", method = RequestMethod.GET)
	public ResponseEntity<?> usernameVerify(@RequestParam String username) {

		final Map<String, Boolean> body = new HashMap<String, Boolean>();
		boolean exists = false;

		try {

			exists = userRepository.findByUsername(username) != null;

		} catch (Exception e) {
			// TODO: handle exception
		}

		body.put("exists", exists);
		return ResponseEntity.ok(body);
	}

	@RequestMapping(value = "/hello", method = RequestMethod.GET)
	public String hello() {

		// TODO falta implementar

		System.out.println("hello !");

		return "/views/hello";
	}
}
